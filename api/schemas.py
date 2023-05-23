"""Pydantic schemas for REST API."""
from pydantic import BaseModel


class AddressBase(BaseModel):
    street: str
    zip: str
    city: str
    country: str


class AddressCreate(BaseModel):
    pass


class Address(AddressBase):
    id: int

    class Config:
        orm_mode = True


class CustomerBase(BaseModel):
    first_name: str
    last_name: str
    address: AddressBase | None = None


class CustomerCreate(CustomerBase):
    pass


class Customer(CustomerBase):
    id: int
    address: Address | None

    class Config:
        orm_mode = True


class SupplierBase(BaseModel):
    name: str
    address: AddressBase | None = None


class SupplierCreate(SupplierBase):
    pass


class Supplier(SupplierBase):
    id: int
    address: Address | None

    class Config:
        orm_mode = True
    