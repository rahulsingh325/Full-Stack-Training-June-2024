from uuid import UUID
from pydantic import BaseModel


class NoteAdd(BaseModel):
    event_id: UUID
    note: str
