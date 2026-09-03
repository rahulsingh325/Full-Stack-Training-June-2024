from uuid import UUID
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query

from app.schemas.bookings.booking_schema import BookingCreate
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.bookings.booking_service import (
    create_booking,
    confirm_booking,
    cancel_booking,
    get_recent_bookings,
    list_bookings,
    get_booking_detail,
    get_booking_kpis,
    get_booking_trend,
    get_booking_category_summary,
    get_booking_category_detail,
)

router = APIRouter()

STATUS_REVERSE_MAP = {
    "Pending": "initiated",
    "Confirmed": "confirmed",
    "Cancelled": "cancelled",
    "Expired": "expired",
}


@router.post("/create")
def create(
    payload: BookingCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_booking(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )


@router.post("/{booking_id}/confirm")
def confirm(
    booking_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = confirm_booking(
        conn=conn,
        user_id=current_user["user_id"],
        booking_id=booking_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Booking not found")
    return result


@router.post("/{booking_id}/cancel")
def cancel(
    booking_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = cancel_booking(
        conn=conn,
        user_id=current_user["user_id"],
        booking_id=booking_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Booking not found")
    return result


@router.get("/list")
def get_bookings(
    status: str | None = Query(None),
    from_date: date | None = Query(None),
    to_date: date | None = Query(None),
    search: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    db_status = None
    if status:
        db_status = STATUS_REVERSE_MAP.get(status)
        if not db_status:
            raise HTTPException(status_code=400, detail="Invalid status filter")

    return list_bookings(
        conn=conn,
        user_id=current_user["user_id"],
        status=db_status,
        from_date=from_date.isoformat() if from_date else None,
        to_date=to_date.isoformat() if to_date else None,
        search=search,
        page=page,
        page_size=page_size,
    )


@router.get("/details/{booking_id}")
def booking_detail(
    booking_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    data = get_booking_detail(
        conn=conn,
        user_id=current_user["user_id"],
        booking_id=booking_id,
    )
    if not data:
        raise HTTPException(status_code=404, detail="Booking not found")
    return data


@router.get("/kpis")
def booking_kpis(
    from_date: date | None = Query(None),
    to_date: date | None = Query(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_booking_kpis(
        conn=conn,
        user_id=current_user["user_id"],
        from_date=from_date,
        to_date=to_date,
    )


@router.get("/trend")
def booking_trend(
    from_date: date = Query(...),
    to_date: date = Query(...),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_booking_trend(
        conn=conn,
        user_id=current_user["user_id"],
        from_date=from_date,
        to_date=to_date,
    )


@router.get("/categories")
def booking_category_summary(
    from_date: date | None = Query(None),
    to_date: date | None = Query(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_booking_category_summary(
        conn=conn,
        user_id=current_user["user_id"],
        from_date=from_date,
        to_date=to_date,
    )


@router.get("/categories/{category_id}")
def booking_category_detail(
    category_id: str,
    from_date: date | None = Query(None),
    to_date: date | None = Query(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_booking_category_detail(
        conn=conn,
        user_id=current_user["user_id"],
        category_id=category_id,
        from_date=from_date,
        to_date=to_date,
    )


@router.get("/recent")
def recent_bookings(
    search: str | None = Query(None),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    limit: int = Query(5, ge=1, le=100),
    offset: int = Query(0, ge=0),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return {
        "items": get_recent_bookings(
            conn=conn,
            user_id=current_user["user_id"],
            search=search,
            start_date=start_date,
            end_date=end_date,
            limit=limit,
            offset=offset,
        ),
        "limit": limit,
        "offset": offset,
    }
