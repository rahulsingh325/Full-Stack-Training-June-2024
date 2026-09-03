from pydantic import BaseModel, Field
from typing import Optional, Literal
import uuid


class Menu(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    image: Optional[str] = None
    price: float = Field(..., gt=0)
    stock: int = Field(..., ge=0)
    sold: int = Field(0, ge=0)
    category: str
    status: Literal["available", "unavailable", "out of stock"] = "available"
    
