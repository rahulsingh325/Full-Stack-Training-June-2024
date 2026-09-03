from uuid import UUID
from datetime import date
from app.db.procedures import call_procedure_read


def get_calendar_agenda(
    conn,
    user_id: int,
    calendar_agenda_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_calendar_agenda_get",
        {
            "user_id": user_id,
            "calendar_agenda_id": calendar_agenda_id,
        },
    )
    return rows[0] if rows else None


def get_calendar_list(
    conn,
    user_id: int,
    from_date: date,
    to_date: date,
    agenda_type: str | None = None,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_calendar_list_get",
        {
            "user_id": user_id,
            "from_date": from_date,
            "to_date": to_date,
            "agenda_type": agenda_type,
        },
    )

    rows = rows or []

    return {
        "from_date": from_date,
        "to_date": to_date,
        "count": len(rows),
        "items": rows,
    }
