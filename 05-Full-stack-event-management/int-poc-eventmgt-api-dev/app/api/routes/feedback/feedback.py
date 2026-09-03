from uuid import UUID

from fastapi import APIRouter, Depends, Query

from app.schemas.feedback.feedback_schema import (
    FeedbackCreate,
    FeedbackRatingTypeCreate,
)
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.feedback.feedback_service import (
    add_feedback,
    list_feedbacks,
    feedback_summary,
    feedback_rating_distribution,
    list_feedback_rating_types,
    create_feedback_rating_type,
)

router = APIRouter()


@router.post("/submit")
def submit_feedback(
    payload: FeedbackCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return add_feedback(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )


@router.get("/list")
def list_feedback(
    event_id: UUID | None = None,
    min_rating: int | None = Query(None, ge=1, le=5),
    max_rating: int | None = Query(None, ge=1, le=5),
    page: int = Query(1, ge=1),
    page_size: int = Query(6, ge=1, le=50),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_feedbacks(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
        min_rating=min_rating,
        max_rating=max_rating,
        page=page,
        page_size=page_size,
    )


@router.get("/summary")
def summary(
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return feedback_summary(
        conn=conn,
        user_id=current_user["user_id"],
    )


@router.get("/rating-distribution")
def rating_distribution(
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return feedback_rating_distribution(
        conn=conn,
        user_id=current_user["user_id"],
    )


@router.get("/rating-types")
def rating_types(
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_feedback_rating_types(
        conn=conn,
        user_id=current_user["user_id"],
    )


@router.post("/rating-types")
def create_rating_type(
    payload: FeedbackRatingTypeCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_feedback_rating_type(
        conn=conn,
        user_id=current_user["user_id"],
        code=payload.code,
        display_name=payload.display_name,
        sort_order=payload.sort_order,
    )
