import RadioSelector from "./RadioSelector"

export default function RouteTypeSelector({ routeType, setRouteType }) {
    const routeTypeOptions = ['Customers', 'Suppliers']
    return (
        <RadioSelector options={routeTypeOptions} activeOption={routeType} setActiveOption={setRouteType} />
    )
}