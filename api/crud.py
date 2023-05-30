from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Literal

from . import models, schemas
from .services import geocoder


def create_address(address: schemas.AddressBase, db: Session = None, commit: bool = False) -> models.Address:
    lat, lon = geocoder.address_to_geolocation(address=address)
    db_address = models.Address(
        street=address.street, zip=address.zip, city=address.city, country=address.country, lat=lat, lon=lon
    )
    if commit:
        db.add(address)
        db.commit()
    return db_address


def get_address_by_values(db: Session, address: schemas.AddressBase) -> models.Address | None:
    result = db.execute(select(models.Address).filter_by(street=address.street, zip=address.zip, city=address.city, country=address.country)
                        ).scalars().all()
    if len(result) > 1:
        raise Exception("More than one address found.")
    elif result:
        return result[0]
    else:
        return None


def update_entity_address(db: Session, entity: models.Base | None, updated_address: schemas.AddressUpdate):
    # Log old address
    old_address = entity.address

    # Address should be set in update
    if updated_address is not None:
        db_address = get_address_by_values(db=db, address=updated_address)
        # Address already exists in DB
        if db_address is not None:
            # Updated address is different from current address
            if db_address.id != entity.address_id:
                entity.address = db_address
            # Addresses are equal, we can stop the update process
            else:
                return
            
        # Address needs to be created
        else:
            entity.address = create_address(address=updated_address)

    # Address should be removed
    elif entity.address is not None:
        entity.address = None

    # Address was and will be `None`
    else:
        return

    # Check if old address should be deleted
    if old_address is not None and len(old_address.customers) + len(old_address.suppliers) == 0:
        db.delete(old_address)

    # Execute update
    db.commit()


def create_customer(db: Session, customer: schemas.CustomerCreate) -> models.Customer:
    if customer.address is not None:
        db_address = create_address(customer.address)
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


def update_customer(db: Session, customer_id: int, customer_update: schemas.CustomerUpdate) -> models.Customer:
    db_customer = db.get(models.Customer, customer_id)

    # Update non-FK fields
    fields_to_compare: list[str] = [
        'first_name',
        'last_name'
    ]
    for field in fields_to_compare:
        if (update_val := customer_update.__dict__[field]) != db_customer.__dict__[field]:
            setattr(db_customer, field, update_val)
    db.commit()
    
    # Update address
    update_entity_address(db=db, entity=db_customer, updated_address=customer_update.address)
    
    # Return updated value
    db.refresh(db_customer)
    return db_customer


def delete_customer(db: Session, customer_id: int) -> None:
    db_customer = db.get(models.Customer, customer_id)
    address_id = db_customer.address_id
    db.delete(db_customer)
    if address_id is not None:
        db_address = db.get(models.Address, address_id)
        if not db_address.suppliers and not len(db_address.customers) > 1:
            db.delete(db_address)
    db.commit()


def create_supplier(db: Session, supplier: schemas.SupplierCreate) -> models.Supplier:
    if supplier.address is not None:
        db_address = create_address(supplier.address)
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


def update_supplier(db: Session, supplier_id: int, supplier_update: schemas.SupplierUpdate) -> models.Supplier:
    db_supplier = db.get(models.Supplier, supplier_id)

    # Update non-FK fields
    fields_to_compare: list[str] = [
        'name',
    ]
    for field in fields_to_compare:
        if (update_val := supplier_update.__dict__[field]) != db_supplier.__dict__[field]:
            setattr(db_supplier, field, update_val)
    db.commit()
    
    # Update address
    update_entity_address(db=db, entity=db_supplier, updated_address=supplier_update.address)
    
    # Return updated value
    db.refresh(db_supplier)
    return db_supplier


def delete_supplier(db: Session, supplier_id: int) -> None:
    db_supplier = db.get(models.Supplier, supplier_id)
    address_id = db_supplier.address_id
    db.delete(db_supplier)
    if address_id is not None:
        db_address = db.get(models.Address, address_id)
        if not db_address.customers and not len(db_address.suppliers) > 1:
            db.delete(db_address)
    db.commit()


def create_route(db: Session, route: schemas.RouteCreate) -> int:
    db_route = models.Route(name=route.name, type=route.type)
    db.add(db_route)
    db.commit()

    prev_node = None
    for node in route.nodes:
        db_node = models.RouteNode(
            route_id=db_route.id,
            entity_id=node,
            prev=prev_node
        )
        db.add(db_node)
        db.commit()
        prev_node = db_node.id
    db.commit()
    return db_route.id


def get_route(db: Session, route_id: int) -> models.Route | None:
    return db.get(models.Route, route_id)


def get_routes(db: Session) -> list[models.Route]:
    return db.scalars(select(models.Route)).all()
