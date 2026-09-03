from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read


def add_prohibited_item(
    conn,
    user_id: int,
    payload: dict,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_prohibited_item_add",
        {
            "user_id": user_id,
            **payload,
        },
    )
    return rows[0] if rows else None


def list_prohibited_items(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_prohibited_items_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )
    return rows or []


def delete_prohibited_item(
    conn,
    user_id: int,
    prohibited_item_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_prohibited_item_delete",
        {
            "user_id": user_id,
            "prohibited_item_id": prohibited_item_id,
        },
    )
    return rows[0] if rows else None
