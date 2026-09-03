from fastapi import APIRouter, Depends, Query

from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.dashboard.dashboard_service import get_full_dashboard

router = APIRouter()


@router.get("/all_data")
def dashboard(
    months: int = Query(6, ge=1, le=24),
    recent_limit: int = Query(5, ge=1, le=20),
    upcoming_limit: int = Query(5, ge=1, le=20),
    activity_limit: int = Query(20, ge=1, le=100),
    month: int = Query(..., ge=1, le=12),
    year: int = Query(..., ge=2020, le=2100),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_full_dashboard(
        conn=conn,
        user_id=current_user["user_id"],
        months=months,
        recent_limit=recent_limit,
        upcoming_limit=upcoming_limit,
        activity_limit=activity_limit,
        month=month,
        year=year,
    )
