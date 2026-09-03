from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime


class GalleryCreate(BaseModel):
    title: str = Field(min_length=1, max_length=150)
    event_id: Optional[UUID] = None


class GalleryListItem(BaseModel):
    id: UUID
    title: str
    cover_image_url: Optional[str]
    event_name: Optional[str]
    category_name: Optional[str]
    created_at: datetime


class GalleryImageAdd(BaseModel):
    image_url: str
    caption: Optional[str] = Field(default=None, max_length=200)


class GalleryImageItem(BaseModel):
    id: UUID
    image_url: str
    caption: Optional[str]
    created_at: datetime
