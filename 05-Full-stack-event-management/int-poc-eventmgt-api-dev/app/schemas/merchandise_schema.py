from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class MerchandiseAdd(BaseModel):
    event_id: UUID
    name: str
    price: float
    stock: int
    description: Optional[str] = None
    image_url: Optional[str] = None
