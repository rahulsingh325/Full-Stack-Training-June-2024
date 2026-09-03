from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime

class OrderItemRequest(BaseModel):
    id: Optional[int] = None
    quantity: Optional[int] = None
    
class OrderItem(BaseModel):
    title: str
    price: float
    quantity: int
    flavorProfile: Optional[str] = None
    image: str


class OrderRequest(BaseModel):
    customer: Optional[str] = None
    table: Optional[str] = None  # Table should be None for takeaway orders
    orderType: Optional[Literal["takeaway", "dine-in"]] = None
    items: Optional[List[OrderItemRequest]] = None
    taxPercent: Optional[float] = None
    discountAmount: Optional[float] = 0
    paymentMode: Optional[Literal["cash", "upi", "card"]] = None
    status: Optional[Literal["waiting", "canceled", "Ready to serve", "completed"]] = "waiting"  # Fixed typo here
    paymentStatus: Optional[Literal["unpaid", "paid"]] = None


class Order(BaseModel):
    id: Optional[int] = None
    customer: str
    table: Optional[str] = None
    orderType: Optional[Literal["takeaway", "dine-in"]]
    items: List[OrderItem]
    subTotal: float
    taxPercent: float
    taxAmount: float
    discountAmount: float = 0
    totalPayable: float
    date: str = Field(default_factory=lambda: datetime.now().strftime("%a, %B %d, %Y"))
    time: str = Field(default_factory=lambda: datetime.now().strftime("%I:%M %p"))
    status: Literal["waiting", "canceled", "Ready to serve", "completed"] = "waiting"
    paymentStatus: Literal["unpaid", "paid"] = "unpaid"
    paymentMode: Optional[Literal["cash", "upi", "card"]] = None
