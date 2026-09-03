from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Form

from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.prohibited_item_service import (
    add_prohibited_item,
    list_prohibited_items,
    delete_prohibited_item,
)

router = APIRouter()


@router.post("/add")
def add(
    event_id: UUID = Form(...),
    title: str = Form(...),
    icon_key: str = Form(...),
    note: str | None = Form(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    payload = {
        "event_id": event_id,
        "title": title,
        "icon_key": icon_key,
        "note": note,
    }

    result = add_prohibited_item(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Prohibited item not added")
    return result


@router.get("/list/{event_id}")
def list_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_prohibited_items(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.delete("/delete/{prohibited_item_id}")
def delete_(
    prohibited_item_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_prohibited_item(
        conn=conn,
        user_id=current_user["user_id"],
        prohibited_item_id=prohibited_item_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Prohibited item not found")
    return result
