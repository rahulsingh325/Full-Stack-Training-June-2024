from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read


def add_seat_zone(
    conn,
    user_id: int,
    payload: dict,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_seat_zone_add",
        {
            "user_id": user_id,
            **payload,
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "seat_zone_id": str(row["seat_zone_id"]),
        "status": row.get("status", "added"),
    }




def list_seat_zones(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_seat_zones_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )
    return rows or []


def delete_seat_zone(
    conn,
    user_id: int,
    zone_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_seat_zone_delete",
        {
            "user_id": user_id,
            "seat_zone_id": zone_id,
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "seat_zone_id": str(row["seat_zone_id"]),
        "status": row.get("status", "deleted"),
    }
