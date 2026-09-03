from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel , Field


class TicketUpsert(BaseModel):
    event_id: UUID
    seat_zone_id: UUID
    
    name: str
    price: float
    access_type: str
    is_vip: bool

    benefits: Optional[List[str]] = None
