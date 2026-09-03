from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form

from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.partner_service import (
    add_partner,
    list_partners,
    delete_partner,
)
from app.utils.upload_image import upload_image

router = APIRouter()


@router.post("/add")
def add(
    event_id: UUID = Form(...),
    name: str = Form(...),
    role: str | None = Form(None),
    website: str | None = Form(None),
    logo: UploadFile | None = File(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    logo_url = upload_image(logo, "partners/logos") if logo else None

    payload = {
        "event_id": event_id,
        "name": name,
        "role": role,
        "website": website,
        "logo_url": logo_url,
    }

    result = add_partner(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Partner not added")
    return result


@router.get("/list/{event_id}")
def list_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_partners(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.delete("/delete/{partner_id}")
def delete_(
    partner_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_partner(
        conn=conn,
        user_id=current_user["user_id"],
        partner_id=partner_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Partner not found")
    return result
