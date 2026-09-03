from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read
from app.schemas.note_schema import NoteAdd


def add_note(
    conn,
    user_id: int,
    payload: NoteAdd,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_note_add",
        {
            "user_id": user_id,
            **payload.model_dump(),
        },
    )
    return rows[0] if rows else None


def list_notes(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_notes_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )
    return rows or []


def delete_note(
    conn,
    user_id: int,
    note_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_note_delete",
        {
            "user_id": user_id,
            "note_id": note_id,
        },
    )
    return rows[0] if rows else None
