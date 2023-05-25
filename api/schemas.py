"""Pydantic schemas for REST API."""
from pydantic import BaseModel, constr


class AddressBase(BaseModel):
    street: constr(min_length=1, strip_whitespace=True)
    zip: constr(min_length=1, strip_whitespace=True)
    city: constr(min_length=1, strip_whitespace=True)
    country: constr(min_length=2, max_length=2, to_upper=True, strip_whitespace=True)


class AddressCreate(BaseModel):
    pass


class Address(AddressBase):
    id: int

    class Config:
        orm_mode = True


class CustomerBase(BaseModel):
    first_name: constr(min_length=1, strip_whitespace=True)
    last_name: constr(min_length=1, strip_whitespace=True)
    address: AddressBase | None = None


class CustomerCreate(CustomerBase):
    pass


class Customer(CustomerBase):
    id: int
    address: Address | None

    class Config:
        orm_mode = True


class SupplierBase(BaseModel):
    name: constr(min_length=1, strip_whitespace=True)
    address: AddressBase | None = None


class SupplierCreate(SupplierBase):
    pass


class Supplier(SupplierBase):
    id: int
    address: Address | None

    class Config:
        orm_mode = True
    