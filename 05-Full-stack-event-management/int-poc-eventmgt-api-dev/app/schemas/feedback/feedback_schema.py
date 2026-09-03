from pydantic import BaseModel, Field
from uuid import UUID
from typing import List, Optional
from datetime import datetime


class FeedbackRatingItem(BaseModel):
    code: str
    value: int = Field(ge=1, le=5)


class FeedbackRatingTypeCreate(BaseModel):
    code: str = Field(min_length=2, max_length=50)
    display_name: str = Field(min_length=2, max_length=100)
    sort_order: int = Field(ge=1)


class FeedbackCreate(BaseModel):
    booking_id: UUID = Field(..., alias="booking_id")
    comment: Optional[str] = None
    is_anonymous: bool = False
    ratings: List[FeedbackRatingItem]

    class Config:
        allow_population_by_field_name = True


class FeedbackListItem(BaseModel):
    id: UUID
    overall_rating: float
    comment: Optional[str]
    reviewer_name: str
    event_name: str
    category_name: str
    created_at: datetime


class FeedbackRatingTypeOut(BaseModel):
    code: str
    display_name: str
    sort_order: int


class FeedbackSubmitResponse(BaseModel):
    feedback_id: UUID
    overall_rating: float
