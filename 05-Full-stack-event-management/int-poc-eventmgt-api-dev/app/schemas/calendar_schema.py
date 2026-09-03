from datetime import date, time
from typing import Optional
from uuid import UUID

from pydantic import BaseModel




class CalendarAgendaResponse(BaseModel):
    calendar_agenda_id: UUID
