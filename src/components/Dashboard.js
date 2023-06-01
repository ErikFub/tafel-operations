import DashboardLargeMetric from "./DashboardLargeMetric";
import DashboardItem from "./DashboardItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import MarkerMap from "./MarkerMap";
import { useEffect, useState } from "react";
import { useTafelApi } from "../contexts/ApiProvider";

export default function Dashboard() {
    const [places, setPlaces] = useState([])

    // Fetch data
    const api = useTafelApi();
    useEffect(() => {
        // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
        (async () => {
            const customerResponse = await api.get('/customers');
            let customersFiltered = [];
            if (customerResponse.ok) {
                const customers = customerResponse.body.map(customer => ({...customer, type: "customer"}))
                customersFiltered = customers.filter(customer => customer.address !== null)
            }

            const supplierResponse = await api.get('/suppliers');
            let suppliersFiltered = [];
            if (supplierResponse.ok) {
                const suppliers = supplierResponse.body.map(supplier => ({...supplier, type: "supplier"}))
                suppliersFiltered = suppliers.filter(supplier => supplier.address !== null)
            }
            setPlaces([...customersFiltered, ...suppliersFiltered]);
        })();
      }, [api]);



    // Calc map center
    const allLat = places.map(place => place.address.lat)
    const latMin = Math.min(...allLat)
    const latMax = Math.max(...allLat)

    const allLon = places.map(place => place.address.lon)
    const lonMin = Math.min(...allLon)
    const lonMax = Math.max(...allLon)

    const centerLat = (latMin + latMax) / 2
    const centerLon = (lonMin + lonMax) / 2

    return (
        <>
            <div className="flex gap-4">
                <div className="grid gap-4">
                    <DashboardItem>
                        <DashboardLargeMetric 
                            url={'/metrics/customers/count'}
                            description={'Customers'}
                            icon={<FontAwesomeIcon icon={icon({name: 'users'})} className='w-8 h-8'/>}
                            accentColor="gray"
                            path="/customers"
                        />
                    </DashboardItem>
                    <DashboardItem>
                        <DashboardLargeMetric 
                            url={'/metrics/suppliers/count'}
                            description={'Suppliers'}
                            icon={<FontAwesomeIcon icon={icon({name: 'boxes-stacked'})} className='w-8 h-8'/>}
                            accentColor="gray"
                            path="/suppliers"
                        />
                    </DashboardItem>
                    <DashboardItem>
                        <DashboardLargeMetric 
                            url={'/metrics/routes/count'}
                            description={'Routes'}
                            icon={<FontAwesomeIcon icon={icon({name: 'route'})} className='w-8 h-8'/>}
                            accentColor="gray"
                            path="/routing"
                        />
                    </DashboardItem>
                </div>
                <div className="w-full">
                    <MarkerMap lat={centerLat} lon={centerLon} places={places} />
                </div>
            </div>
        </>
    )
}