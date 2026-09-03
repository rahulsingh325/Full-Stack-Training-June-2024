from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read
from app.schemas.merchandise_schema import MerchandiseAdd


def add_merchandise(
    conn,
    user_id: int,
    payload: MerchandiseAdd | dict,
):
    data = payload.model_dump() if hasattr(payload, "model_dump") else payload

    rows = call_procedure(
        conn,
        "emd.sp_event_merchandise_add",
        {
            "user_id": user_id,
            **data,
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "merchandise_id": str(row["merchandise_id"]),
        "status": row["status"],
    }



def list_merchandise(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_merchandise_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )
    return rows or []


def delete_merchandise(
    conn,
    user_id: int,
    merchandise_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_merchandise_delete",
        {
            "user_id": user_id,
            "merchandise_id": merchandise_id,
        },
    )
    return rows[0] if rows else None
