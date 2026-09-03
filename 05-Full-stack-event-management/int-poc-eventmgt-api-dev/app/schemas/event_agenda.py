from datetime import date, time
from typing import Optional
from pydantic import BaseModel


class EventAgendaCreate(BaseModel):
    agenda_type: str            # event | rehearsal | meeting | setup
    title: str

    agenda_date: date
    start_time: time
    end_time: time

    location: Optional[str] = None

    pic_name: Optional[str] = None
    pic_role: Optional[str] = None
    pic_phone: Optional[str] = None
    pic_email: Optional[str] = None

    notes: Optional[str] = None


class EventAgendaUpdate(BaseModel):
    agenda_date: date
    start_time: time
    end_time: time

    location: Optional[str] = None

    pic_name: Optional[str] = None
    pic_role: Optional[str] = None
    pic_phone: Optional[str] = None
    pic_email: Optional[str] = None

    notes: Optional[str] = None