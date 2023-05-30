"""Data models for SQLAlchemy ORM."""
import datetime

from sqlalchemy import ForeignKey, UniqueConstraint, CheckConstraint, DateTime
from sqlalchemy.orm import relationship, mapped_column, Mapped
from sqlalchemy.sql import func

from .database import Base


class Address(Base):
    __tablename__ = "addresses"
    __table_args__ = (UniqueConstraint('street', 'zip', 'city', 'country', name='_address_uc'),
                     )

    id: Mapped[int] = mapped_column(primary_key=True)
    street: Mapped[str]
    zip: Mapped[str]
    city: Mapped[str]
    country: Mapped[str]
    lat: Mapped[float]
    lon: Mapped[float]

    customers: Mapped[list["Customer"]] = relationship(back_populates='address')
    suppliers: Mapped[list["Supplier"]] = relationship(back_populates='address')


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str]
    last_name: Mapped[str]
    address_id: Mapped[int | None] = mapped_column(ForeignKey("addresses.id"))

    address: Mapped["Address"] = relationship(back_populates="customers")


class Supplier(Base):
    __tablename__ = "suppliers"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    address_id: Mapped[int | None] = mapped_column(ForeignKey("addresses.id"))

    address: Mapped["Address"] = relationship(back_populates="suppliers")


class Route(Base):
    __tablename__ = "routes"
    __table_args__ = (
        CheckConstraint("type in ('customers', 'suppliers')", "type_valid"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    type: Mapped[str]
    timestamp: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    nodes: Mapped[list["RouteNode"]] = relationship(back_populates="route")


class RouteNode(Base):
    __tablename__ = "routes_nodes"

    id: Mapped[int] = mapped_column(primary_key=True)
    route_id: Mapped[int] = mapped_column(ForeignKey("routes.id"))
    entity_id: Mapped[int]
    prev: Mapped[int | None] = mapped_column(ForeignKey("routes_nodes.id"))

    route: Mapped["Route"] = relationship(back_populates="nodes")
