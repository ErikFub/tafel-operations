from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/customers", response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db=db, customer=customer)


@app.get("/api/customers", response_model=list[schemas.Customer])
def read_customers(db: Session = Depends(get_db)):
    return crud.get_customers(db=db)


@app.get("/api/customers/{customer_id}", response_model=schemas.Customer)
def read_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = crud.get_customer(db=db, customer_id=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_customer


@app.delete("/api/customers/{customer_id}", status_code=204)
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = crud.get_customer(db=db, customer_id=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    crud.delete_customer(db=db, customer_id=customer_id)


@app.post("/api/suppliers", response_model=schemas.Supplier)
def create_supplier(supplier: schemas.SupplierCreate, db: Session = Depends(get_db)):
    return crud.create_supplier(db=db, supplier=supplier)


@app.get("/api/suppliers", response_model=list[schemas.Supplier])
def read_suppliers(db: Session = Depends(get_db)):
    return crud.get_suppliers(db=db)


@app.get("/api/suppliers/{supplier_id}", response_model=schemas.Supplier)
def read_supplier(supplier_id: int, db: Session = Depends(get_db)):
    db_supplier = crud.get_supplier(db=db, supplier_id=supplier_id)
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return db_supplier


@app.delete("/api/suppliers/{supplier_id}", status_code=204)
def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    db_supplier = crud.get_supplier(db=db, supplier_id=supplier_id)
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    crud.delete_supplier(db=db, supplier_id=supplier_id)
