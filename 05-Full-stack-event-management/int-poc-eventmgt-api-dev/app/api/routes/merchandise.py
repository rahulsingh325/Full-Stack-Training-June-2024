from uuid import UUID
import json

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form

from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.merchandise_service import (
    add_merchandise,
    list_merchandise,
    delete_merchandise,
)
from app.utils.upload_image import upload_image

router = APIRouter()


@router.post("/add")
def add(
    data: str = Form(...),
    image: UploadFile = File(...),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    payload = json.loads(data)
    payload["image_url"] = upload_image(image, "merchandise")

    result = add_merchandise(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Merchandise not added")
    return result


@router.get("/list/{event_id}")
def list_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_merchandise(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.delete("/delete/{merchandise_id}")
def delete_(
    merchandise_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_merchandise(
        conn=conn,
        user_id=current_user["user_id"],
        merchandise_id=merchandise_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Merchandise not found")
    return result
