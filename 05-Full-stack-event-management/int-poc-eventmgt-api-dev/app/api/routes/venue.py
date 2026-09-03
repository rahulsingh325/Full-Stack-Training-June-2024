import json
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File

from app.schemas.venue_schema import VenueUpsert
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.venue_service import (
    upsert_venue,
    get_venue,
    delete_venue,
)
from app.utils.upload_image import upload_image

router = APIRouter()


@router.post("/create")
def save(
    data: str = Form(...),
    seat_plan_image: UploadFile = File(...),
    map_image: UploadFile = File(...),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    payload_dict = json.loads(data)

    payload_dict["seat_plan_image_url"] = upload_image(
        seat_plan_image, "venues/seating"
    )
    payload_dict["map_image_url"] = upload_image(
        map_image, "venues/maps"
    )

    payload = VenueUpsert(**payload_dict)

    result = upsert_venue(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Venue not saved")
    return result


@router.get("/get/{event_id}")
def get_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_venue(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.delete("/delete/{event_id}")
def delete_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_venue(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Venue not found")
    return result
