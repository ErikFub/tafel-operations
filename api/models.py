"""Data models for SQLAlchemy ORM."""
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship, mapped_column, Mapped

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

    customers: Mapped["Customer"] = relationship(back_populates='address')
    suppliers: Mapped["Supplier"] = relationship(back_populates='address')


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
