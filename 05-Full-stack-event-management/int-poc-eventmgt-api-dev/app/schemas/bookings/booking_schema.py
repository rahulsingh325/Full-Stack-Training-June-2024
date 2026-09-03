from uuid import UUID
from typing import List
from datetime import date, datetime
from pydantic import BaseModel, Field, EmailStr


class BookingItemCreate(BaseModel):
    ticket_id: UUID
    quantity: int = Field(gt=0)


class BookingCreate(BaseModel):
    event_id: UUID

    customer_name: str = Field(min_length=1, max_length=100)
    customer_email: EmailStr
    customer_phone: str = Field(min_length=6, max_length=20)
    customer_address: str = Field(min_length=5, max_length=255)

    items: List[BookingItemCreate]


class BookingListItem(BaseModel):
    booking_id: UUID
    booking_ref: str
    booking_date: datetime

    customer_name: str
    customer_email: EmailStr

    event_name: str

    ticket_category: str
    price: float
    qty: int

    amount: float
    currency: str
    status: str

    invoice_id: UUID | None
    invoice_no: str | None
    voucher_code: str | None
    has_voucher: bool



class BookingListResponse(BaseModel):
    items: List[BookingListItem]
    page: int
    page_size: int
    total_count: int
    
    
    
class BookingKPIResponse(BaseModel):
    total_bookings: int
    total_tickets_sold: int
    total_earnings: float


class BookingTrendItem(BaseModel):
    booking_date: date
    booking_count: int


class BookingCategorySummaryItem(BaseModel):
    category_name: str
    booking_count: int
    percentage: float


class BookingCategoryDetailItem(BaseModel):
    event_name: str
    tickets_sold: int
    total_capacity: int