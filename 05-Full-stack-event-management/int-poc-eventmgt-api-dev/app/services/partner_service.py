from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read


def add_partner(
    conn,
    user_id: int,
    payload: dict,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_partner_add",
        {
            "user_id": user_id,
            **payload,
        },
    )
    return rows[0] if rows else None


def list_partners(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_partners_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )
    return rows or []


def delete_partner(
    conn,
    user_id: int,
    partner_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_partner_delete",
        {
            "user_id": user_id,
            "partner_id": partner_id,
        },
    )
    return rows[0] if rows else None
