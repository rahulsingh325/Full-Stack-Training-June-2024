from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.schemas.note_schema import NoteAdd
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.note_service import (
    add_note,
    list_notes,
    delete_note,
)

router = APIRouter()


@router.post("/add")
def add(
    payload: NoteAdd,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = add_note(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Note not added")
    return result


@router.get("/list/{event_id}")
def list_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_notes(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.delete("/delete/{note_id}")
def delete_(
    note_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_note(
        conn=conn,
        user_id=current_user["user_id"],
        note_id=note_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Note not found")
    return result
