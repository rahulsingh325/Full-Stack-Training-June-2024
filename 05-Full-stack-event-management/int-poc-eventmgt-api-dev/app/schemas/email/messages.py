from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import List, Optional


class EmailDraftCreateRequest(BaseModel):
    subject: str = Field(min_length=1, max_length=255)
    body: str


class EmailSendRequest(BaseModel):
    email_id: UUID
    receiver_user_id: int


class EmailListItem(BaseModel):
    email_id: UUID
    subject: str
    created_at: str
    sent_at: Optional[str]
    folder: str
    is_read: bool
    is_starred: bool
    sender_email: Optional[str] = None
    receiver_email: Optional[str] = None
    from_name: Optional[str] = None
    receiver_name: Optional[str] = None



class EmailListResponse(BaseModel):
    items: List[EmailListItem]
    page: int
    page_size: int


class EmailUpdateStateRequest(BaseModel):
    is_read: Optional[bool] = None
    is_starred: Optional[bool] = None
    target_folder: Optional[str] = None


class EmailDetailResponse(BaseModel):
    email_id: UUID
    subject: str
    body: str
    sent_at: Optional[datetime]
    folder: str
    is_read: bool
    is_starred: bool

    sender_email: str
    receiver_email: Optional[str]
