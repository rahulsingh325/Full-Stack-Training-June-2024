from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class ArtistAdd(BaseModel):
    event_id: UUID
    name: str
    role: Optional[str] = None
    display_order: int
