from uuid import UUID
from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str


class CategoryDeleteResponse(BaseModel):
    category_id: UUID
    status: str
