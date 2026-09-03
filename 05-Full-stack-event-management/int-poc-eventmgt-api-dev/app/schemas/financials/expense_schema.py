from pydantic import BaseModel, Field
from datetime import date
from typing import Optional
from uuid import UUID


class ExpenseCreate(BaseModel):
    expense_date: date
    category_id: UUID
    description: Optional[str] = Field(default=None, max_length=500)
    amount: float = Field(gt=0)
    currency: str = Field(min_length=3, max_length=3)


class ExpenseCategoryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class ExpenseCategoryOut(BaseModel):
    id: UUID
    name: str
