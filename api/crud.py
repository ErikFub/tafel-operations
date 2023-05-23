from sqlalchemy.orm import Session
from sqlalchemy import select

from . import models, schemas


def create_customer(db: Session, customer: schemas.CustomerCreate) -> models.Customer:
    if customer.address is not None:
        db_address = models.Address(
            street=customer.address.street, zip=customer.address.zip, city=customer.address.city, country=customer.address.country
        )
        db_address_result = get_address_by_values(db=db, address=customer.address)
        if db_address_result is not None:
            db_address = db_address_result
    else:
        db_address = None
    db_customer = models.Customer(
        first_name=customer.first_name, last_name=customer.last_name, address=db_address
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


def get_customer(db: Session, customer_id: int) -> models.Customer | None:
    return db.get(models.Customer, customer_id)


def get_customers(db: Session) -> list[models.Customer]:
    return db.scalars(select(models.Customer)).all()


def create_supplier(db: Session, supplier: schemas.SupplierCreate) -> models.Supplier:
    if supplier.address is not None:
        db_address = models.Address(
            street=supplier.address.street, zip=supplier.address.zip, city=supplier.address.city, country=supplier.address.country
        )
        db_address_result = get_address_by_values(db=db, address=supplier.address)
        if db_address_result is not None:
            db_address=db_address_result
    else:
        db_address = None
    db_supplier = models.Supplier(
        name=supplier.name, address=db_address
    )
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier


def get_supplier(db: Session, supplier_id: int) -> models.Supplier | None:
    return db.get(models.Supplier, supplier_id)


def get_suppliers(db: Session) -> list[models.Supplier]:
    return db.scalars(select(models.Supplier)).all()


def get_address_by_values(db: Session, address: schemas.AddressBase) -> models.Address | None:
    result = db.execute(select(models.Address).filter_by(street=address.street, zip=address.zip, city=address.city, country=address.country)
                        ).scalars().all()
    if len(result) > 1:
        raise Exception("More than one address found.")
    elif result:
        return result[0]
    else:
        return None
