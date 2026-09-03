from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class VenueUpsert(BaseModel):
    event_id: UUID

    name: str
    address: str
    city: str
    state: Optional[str] = None
    country: str

    map_link: Optional[str] = None
    landmark: Optional[str] = None

    has_parking: bool
    gates_count: int

    seat_plan_image_url: str
    map_image_url: str

    by_car: Optional[str] = None
    by_metro: Optional[str] = None
    by_bus: Optional[str] = None
