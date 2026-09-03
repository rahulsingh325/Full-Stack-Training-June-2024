from datetime import date, time
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, model_validator , field_validator


# =============================
# TIMING VALIDATION MIXIN
# =============================

class EventTimingValidationMixin(BaseModel):

    start_time: Optional[time] = None
    end_time: Optional[time] = None
    gate_open_time: Optional[time] = None
    last_entry_time: Optional[time] = None

    has_pre_show: Optional[bool] = None
    pre_show_start: Optional[time] = None
    pre_show_end: Optional[time] = None

    has_opening: Optional[bool] = None
    opening_start: Optional[time] = None
    opening_end: Optional[time] = None

    @model_validator(mode="after")
    def validate_event_timings(self):
        if self.start_time and self.end_time and self.start_time >= self.end_time:
            raise ValueError("start_time must be before end_time")

        if self.gate_open_time and self.start_time and self.gate_open_time >= self.start_time:
            raise ValueError("gate_open_time must be before start_time")

        if self.last_entry_time and self.end_time and self.last_entry_time > self.end_time:
            raise ValueError("last_entry_time must be <= end_time")

        if self.has_pre_show is False and (self.pre_show_start or self.pre_show_end):
            raise ValueError("pre_show times must be null when has_pre_show=false")

        if self.has_pre_show is True:
            if not self.pre_show_start or not self.pre_show_end:
                raise ValueError("pre_show times required when has_pre_show=true")
            if self.pre_show_start >= self.pre_show_end:
                raise ValueError("pre_show_start must be before pre_show_end")

        if self.has_opening is False and (self.opening_start or self.opening_end):
            raise ValueError("opening times must be null when has_opening=false")

        if self.has_opening is True:
            if not self.opening_start or not self.opening_end:
                raise ValueError("opening times required when has_opening=true")
            if self.opening_start >= self.opening_end:
                raise ValueError("opening_start must be before opening_end")

        return self


# =============================
# CREATE DRAFT
# =============================

class EventCreateDraft(EventTimingValidationMixin):
    name: str
    description: str
    category_id: UUID

    event_date: date
    start_time: time
    end_time: time
    location: Optional[str] = None

    gate_open_time: Optional[time] = None
    last_entry_time: Optional[time] = None

    has_pre_show: bool = False
    pre_show_start: Optional[time] = None
    pre_show_end: Optional[time] = None

    has_opening: bool = False
    opening_start: Optional[time] = None
    opening_end: Optional[time] = None

    terms: Optional[str] = None
    banner_image_url: Optional[str] = None


# =============================
# UPDATE DRAFT
# =============================

class EventUpdateDraft(EventTimingValidationMixin):
    name: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[UUID] = None

    gate_open_time: Optional[time] = None
    last_entry_time: Optional[time] = None

    has_pre_show: Optional[bool] = None
    pre_show_start: Optional[time] = None
    pre_show_end: Optional[time] = None

    has_opening: Optional[bool] = None
    opening_start: Optional[time] = None
    opening_end: Optional[time] = None

    terms: Optional[str] = None

    # ⬇ optional, backend-controlled
    banner_image_url: Optional[str] = None


# =============================
# UPDATE ACTIVE
# =============================

class EventUpdateActive(BaseModel):
    description: Optional[str] = None
    terms: Optional[str] = None


# =============================
# LIST QUERY
# =============================

class EventListQuery(BaseModel):
    limit: int = 8
    offset: int = 0

    status: Optional[str] = None
    search: Optional[str] = None
    category: Optional[str] = None

    date_filter: str = "all"
    from_date: Optional[date] = None
    to_date: Optional[date] = None

    # 🔒 empty string → None
    @field_validator("search", "category", "status", mode="before")
    @classmethod
    def empty_string_to_none(cls, v):
        if v == "":
            return None
        return v

    # 🔒 strict date_filter
    @field_validator("date_filter")
    @classmethod
    def validate_date_filter(cls, v):
        allowed = {"all", "week", "month", "custom"}
        if v not in allowed:
            raise ValueError("date_filter must be one of all|week|month|custom")
        return v
