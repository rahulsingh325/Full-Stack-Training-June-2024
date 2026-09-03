# app/schemas/organization_schema.py
from uuid import UUID
from pydantic import BaseModel


class OrganizationCreate(BaseModel):
    name: str
    address: str
    email: str | None = None
    phone: str | None = None
    tax_id: str | None = None


class OrganizationUpdate(OrganizationCreate):
    pass


class OrganizationResponse(BaseModel):
    id: UUID
    name: str
    address: str
    email: str | None
    phone: str | None
    tax_id: str | None
