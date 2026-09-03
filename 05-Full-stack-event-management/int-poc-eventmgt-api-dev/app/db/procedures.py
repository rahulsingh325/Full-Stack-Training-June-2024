import pyodbc
import re
from fastapi import HTTPException


def _build_exec_query(proc_name: str, params: dict | None) -> tuple[str, list]:
    if not params:
        return f"EXEC {proc_name}", []

    placeholders = ", ".join(f"@{key}=?" for key in params.keys())
    return f"EXEC {proc_name} {placeholders}", list(params.values())


def call_procedure(conn, proc_name: str, params: dict):
    cursor = conn.cursor()
    try:
        query, values = _build_exec_query(proc_name, params)
        cursor.execute(query, values)

        if not cursor.description:
            return []

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

        return [dict(zip(columns, row)) for row in rows]

    except pyodbc.Error as exc:
        try:
            conn.rollback()
        except Exception:
            pass
        _raise_business_exception(exc)

    finally:
        cursor.close()



def call_procedure_read(
    conn,
    proc_name: str,
    params: dict | None = None,
    *,
    multi: bool = False,
    ):
    cursor = conn.cursor()

    try:
        query, values = _build_exec_query(proc_name, params)
        cursor.execute(query, values)

        results = []

        while True:
            if cursor.description:
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()
                results.append([dict(zip(columns, row)) for row in rows])

            if not cursor.nextset():
                break

        #  WRITE-ONLY SP → SUCCESS
        if not results:
            return [] if not multi else [[]]

        return results if multi else results[-1]

    except pyodbc.Error as exc:
        _raise_business_exception(exc)

    finally:
        cursor.close()



def _raise_business_exception(exc: pyodbc.Error) -> None:
    # error_msg = f"{exc}"
    raise HTTPException(500, str(exc))
    
    # -------- ORGANIZATION --------
    if "(87001)" in error_msg:
        raise HTTPException(400, "Organization name required")

    if "(87002)" in error_msg:
        raise HTTPException(409, "Organization already exists")

    if "(87003)" in error_msg:
        raise HTTPException(404, "Organization not found")

    if "(87004)" in error_msg:
        raise HTTPException(404, "Organization not found")

    
    # -------- CATEGORY --------
    if "(80001)" in error_msg:
        raise HTTPException(400, "Invalid category name")

    if "(80002)" in error_msg:
        raise HTTPException(409, "Category already exists")

    if "(80003)" in error_msg:
        raise HTTPException(404, "Category not found or already inactive")

    
    # -------- FEEDBACK --------
    if "(98101)" in error_msg:
        raise HTTPException(400, "Rating code required")

    if "(98102)" in error_msg:
        raise HTTPException(409, "Rating code already exists")

    if "(98001)" in error_msg:
        raise HTTPException(400, "Feedback allowed only for confirmed bookings")

    if "(98003)" in error_msg:
        raise HTTPException(400, "At least one valid rating is required")


    # -------- AUTH --------
    if "EMAIL_ALREADY_EXISTS" in error_msg or "(50001)" in error_msg:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # -------- MERCHANDISE --------
    if "(84002)" in error_msg:
        raise HTTPException(404, "Merchandise not found or already deleted")

    if "(84001)" in error_msg:
        raise HTTPException(400, "Merchandise can be added only for draft events")

    # -------- PARTNER --------
    if "(83002)" in error_msg:
        raise HTTPException(404, "Partner not found or already deleted")

    # -------- TICKET --------
    if "(85004)" in error_msg:
        raise HTTPException(404, "Ticket not found")

    if "(85001)" in error_msg:
        raise HTTPException(400, "Tickets can be added only for draft events")

    # -------- ARTIST --------
    if "(90001)" in error_msg:
        raise HTTPException(400, "Artists can be added only to draft events")

    if "(90004)" in error_msg:
        raise HTTPException(404, "Artist not found or event not editable")

    if "(90005)" in error_msg:
        raise HTTPException(404, "Artist not found")

    # -------- PROHIBITED ITEMS --------
    if "(91001)" in error_msg:
        raise HTTPException(400, "Prohibited items can be added only to draft events")

    if "(91002)" in error_msg:
        raise HTTPException(404, "Prohibited item not found or event not editable")

    # -------- SEAT ZONES --------
    if "(92001)" in error_msg:
        raise HTTPException(400, "Seat zones can be added only to draft events")

    if "(92002)" in error_msg:
        raise HTTPException(400, "Invalid seat zone capacity")

    if "(92003)" in error_msg:
        raise HTTPException(404, "Seat zone not found or event not editable")

    # -------- BOOKINGS --------
    if "(93001)" in error_msg:
        raise HTTPException(400, "Booking allowed only for active events")

    if "(93002)" in error_msg:
        raise HTTPException(400, "Booking items required")

    if "(93003)" in error_msg:
        raise HTTPException(400, "Invalid booking total")

    if "(93004)" in error_msg:
        raise HTTPException(400, "Seat zone capacity exceeded")

    if "(93010)" in error_msg:
        raise HTTPException(400, "Customer name required")

    if "(93011)" in error_msg:
        raise HTTPException(400, "Customer email required")

    # -------- BOOKING CONFIRM --------
    if "(94001)" in error_msg:
        raise HTTPException(
            status_code=400,
            detail="Booking expired or already processed"
        )

    # -------- FALLBACK --------
    raise HTTPException(
        status_code=500,
        detail="Database operation failed"
    )
