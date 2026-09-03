from uuid import UUID
from pydantic import BaseModel, Field


class SeatZoneAdd(BaseModel):
    event_id: UUID
    name: str = Field(min_length=2, max_length=100)
    gate_no: int = Field(gt=0)
    capacity: int = Field(gt=0)
