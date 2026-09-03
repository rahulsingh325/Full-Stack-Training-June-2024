from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class ProhibitedItemAdd(BaseModel):
    event_id: UUID
    title: str
    icon_key: str
    note: Optional[str] = None
