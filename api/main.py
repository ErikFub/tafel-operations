from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine
from .services import tsp_solver

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


@app.post("/api/customers", response_model=schemas.Customer, status_code=201)
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


@app.put("/api/customers/{customer_id}", response_model=schemas.Customer)
def update_customer(customer_id, customer_update: schemas.CustomerUpdate, db: Session = Depends(get_db)):
    db_customer = crud.get_customer(db=db, customer_id=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    db_updated_customer = crud.update_customer(db=db, customer_id=customer_id, customer_update=customer_update)
    return db_updated_customer


@app.delete("/api/customers/{customer_id}", status_code=204)
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = crud.get_customer(db=db, customer_id=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    crud.delete_customer(db=db, customer_id=customer_id)


@app.post("/api/suppliers", response_model=schemas.Supplier, status_code=201)
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


@app.put("/api/suppliers/{supplier_id}", response_model=schemas.Supplier)
def update_supplier(supplier_id, supplier_update: schemas.SupplierUpdate, db: Session = Depends(get_db)):
    db_supplier = crud.get_supplier(db=db, supplier_id=supplier_id)
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    db_updated_supplier = crud.update_supplier(db=db, supplier_id=supplier_id, supplier_update=supplier_update)
    return db_updated_supplier


@app.delete("/api/suppliers/{supplier_id}", status_code=204)
def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    db_supplier = crud.get_supplier(db=db, supplier_id=supplier_id)
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    crud.delete_supplier(db=db, supplier_id=supplier_id)


@app.post("/api/routing/solver", response_model=list[int])
def get_best_route(route: schemas.RouteSolverRequest, db: Session = Depends(get_db)):
    get_entity_details = crud.get_supplier if route.type == "suppliers" else crud.get_customer
    coordinates = [
        (id, tsp_solver.Coordinate(address.lat, address.lon))
        for id in route.nodes
        if (address := get_entity_details(db, id).address) is not None
    ]
    route = tsp_solver.get_best_route(coordinates=[e[1] for e in coordinates])
    return [coordinates[i][0] for i in route]


@app.post("/api/routing/routes", response_model=int, status_code=201)
def create_route(route: schemas.RouteCreate, db: Session = Depends(get_db)):
    return crud.create_route(db=db, route=route)


def get_succeeding_nodes(find_node: models.RouteNode, search_nodes: list[models.RouteNode]):
    if not search_nodes:
        return []
    for i, search_node in enumerate(search_nodes):
        if search_node.prev == find_node.id:
            print(f"Found node {search_node.id}")
            search_nodes.pop(i)
            return [search_node] + get_succeeding_nodes(search_node, search_nodes)
    else:
        return []


def nodes_ordered(nodes: list[models.RouteNode]) -> list[models.RouteNode]:
    start_nodes = [n for n in nodes if n.prev is None]
    if len(start_nodes) > 1:
        raise Exception("Route can only have one starting node")
    start_node = start_nodes[0]
    return [start_node] + get_succeeding_nodes(start_node, nodes)


@app.get("/api/routing/routes/{route_id}", response_model=schemas.Route)
def read_route(route_id: int, db: Session = Depends(get_db)):
    db_route = crud.get_route(db=db, route_id=route_id)
    if db_route is None:
        raise HTTPException(status_code=404, detail="Route not found")

    get_entity_details = crud.get_supplier if db_route.type == 'suppliers' else crud.get_customer
    return schemas.Route(
        id=db_route.id,
        name=db_route.name,
        type=db_route.type,
        nodes=[get_entity_details(db, node.entity_id) for node in db_route.nodes],
        timestamp=db_route.timestamp
    )


@app.get("/api/routing/routes", response_model=list[schemas.Route])
def read_routes(db: Session = Depends(get_db)):
    db_routes = crud.get_routes(db=db)
    routes = []
    for db_route in db_routes:
        if db_route is None:
            raise HTTPException(status_code=404, detail="Route not found")

        get_entity_details = crud.get_supplier if db_route.type == 'suppliers' else crud.get_customer
        route = schemas.Route(
            id=db_route.id,
            name=db_route.name,
            type=db_route.type,
            nodes=[get_entity_details(db, node.entity_id) for node in nodes_ordered(db_route.nodes)],
            timestamp=db_route.timestamp
        )
        routes.append(route)
    return routes


@app.get("/api/metrics/customers/count", response_model=int)
def read_customer_count(db: Session = Depends(get_db)):
    return crud.get_count(db=db, model=models.Customer)


@app.get("/api/metrics/suppliers/count", response_model=int)
def read_customer_count(db: Session = Depends(get_db)):
    return crud.get_count(db=db, model=models.Supplier)


@app.get("/api/metrics/routes/count", response_model=int)
def read_customer_count(db: Session = Depends(get_db)):
    return crud.get_count(db=db, model=models.Route)


@app.get("/api/metrics/routes/avg-nodes", response_model=float)
def read_customer_count(db: Session = Depends(get_db)):
    try:
        return crud.get_count(db=db, model=models.RouteNode) / crud.get_count(db=db, model=models.Route)
    except ZeroDivisionError:
        return 0.0
