from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class PartnerAdd(BaseModel):
    event_id: UUID
    name: str
    role: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
