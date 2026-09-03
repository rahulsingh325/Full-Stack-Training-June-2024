from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.schemas.seat_zone_schema import SeatZoneAdd
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.seat_zone_service import (
    add_seat_zone,
    list_seat_zones,
    delete_seat_zone,
)

router = APIRouter()


@router.post("/add")
def add(
    payload: SeatZoneAdd,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = add_seat_zone(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload.model_dump(),
    )
    if not result:
        raise HTTPException(status_code=400, detail="Seat zone not added")
    return result


@router.get("/list/{event_id}")
def list_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_seat_zones(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.delete("/delete/{zone_id}")
def delete_(
    zone_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_seat_zone(
        conn=conn,
        user_id=current_user["user_id"],
        zone_id=zone_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Seat zone not found")
    return result
