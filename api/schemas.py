"""Pydantic schemas for REST API."""
from pydantic import BaseModel


class AddressBase(BaseModel):
    street: str
    zip: str
    city: str
    country: str


class Address(AddressBase):
    id: int

    class Config:
        orm_mode = True


class CustomerBase(BaseModel):
    first_name: str
    last_name: str
    address: Address | None = None


class Customer(CustomerBase):
    id: int

    class Config:
        orm_mode = True


class SupplierBase(BaseModel):
    name: str
    address: Address | None = None


class Supplier(SupplierBase):
    id: int

    class Config:
        orm_mode = True
    