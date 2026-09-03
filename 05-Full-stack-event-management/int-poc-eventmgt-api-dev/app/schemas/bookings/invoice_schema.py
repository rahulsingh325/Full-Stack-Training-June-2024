from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from typing import Optional


class InvoiceEditRequest(BaseModel):
    bill_to_name: str = Field(min_length=1, max_length=150)
    bill_to_email: EmailStr
    bill_to_address: str = Field(min_length=5, max_length=300)
    notes: Optional[str] = Field(default=None, max_length=500)
    due_date: datetime


class InvoiceActionResponse(BaseModel):
    status: str
