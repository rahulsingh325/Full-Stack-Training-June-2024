from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Form

from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.artist_service import (
    add_artist,
    list_artists,
    update_artist,
    delete_artist,
)

router = APIRouter()


@router.post("/add")
def add(
    event_id: UUID = Form(...),
    name: str = Form(...),
    role: str | None = Form(None),
    display_order: int = Form(...),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    payload = {
        "event_id": event_id,
        "name": name,
        "role": role,
        "display_order": display_order,
    }

    result = add_artist(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Artist not added")

    return result


@router.get("/list/{event_id}")
def list_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_artists(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.put("/update")
def update(
    artist_id: UUID = Form(...),
    name: str = Form(...),
    role: str | None = Form(None),
    display_order: int = Form(...),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    payload = {
        "artist_id": artist_id,
        "name": name,
        "role": role,
        "display_order": display_order,
    }

    result = update_artist(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Artist not found")

    return result


@router.delete("/delete/{artist_id}")
def delete_(
    artist_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_artist(
        conn=conn,
        user_id=current_user["user_id"],
        artist_id=artist_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Artist not found")
    return result
