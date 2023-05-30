"""Pydantic schemas for REST API."""
import datetime

from pydantic import BaseModel, constr
from typing import Literal


class AddressBase(BaseModel):
    street: constr(min_length=1, strip_whitespace=True)
    zip: constr(min_length=1, strip_whitespace=True)
    city: constr(min_length=1, strip_whitespace=True)
    country: constr(min_length=2, max_length=2, to_upper=True, strip_whitespace=True)


class AddressCreate(AddressBase):
    pass


class AddressUpdate(AddressBase):
    pass


class Address(AddressBase):
    id: int
    lat: float
    lon: float

    class Config:
        orm_mode = True


class CustomerBase(BaseModel):
    first_name: constr(min_length=1, strip_whitespace=True)
    last_name: constr(min_length=1, strip_whitespace=True)
    address: AddressBase | None = None


class CustomerCreate(CustomerBase):
    address: AddressCreate | None = None


class CustomerUpdate(CustomerBase):
    address: AddressUpdate | None = None


class Customer(CustomerBase):
    id: int
    address: Address | None

    class Config:
        orm_mode = True


class SupplierBase(BaseModel):
    name: constr(min_length=1, strip_whitespace=True)
    address: AddressBase | None = None


class SupplierCreate(SupplierBase):
    address: AddressCreate | None = None


class SupplierUpdate(SupplierBase):
    address: AddressUpdate | None = None


class Supplier(SupplierBase):
    id: int
    address: Address | None

    class Config:
        orm_mode = True
    

class RouteBase(BaseModel):
    nodes: list
    type: Literal["suppliers", "customers"]


class RouteCreate(RouteBase):
    name: str
    nodes: list[int]


class RouteSolverRequest(RouteBase):
    nodes: list[int]


class Route(RouteBase):
    id: int
    name: str
    nodes: list[Customer | Supplier]
    timestamp: datetime.datetime
