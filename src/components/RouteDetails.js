import Map from "./Map";
import RouteNodesTable from "./RouteNodesTable";


export default function RouteDetails({ data }) {
    // Calc map center
    const allLat = data.nodes.map(node => node.address.lat)
    const latMin = Math.min(...allLat)
    const latMax = Math.max(...allLat)

    const allLon = data.nodes.map(node => node.address.lon)
    const lonMin = Math.min(...allLon)
    const lonMax = Math.max(...allLon)

    const centerLat = (latMin + latMax) / 2
    const centerLon = (lonMin + lonMax) / 2


    return (
        <div className="rounded-lg bg-white shadow px-5 py-3 ">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h1 className="text-xl font-bold mb-3">{data.name}</h1>
                    <h3>{data.timestamp}</h3>
                    <div className="h-64">
                        Send to phone placeholder
                    </div>
                </div>
                <div>
                    <Map lat={centerLat} lon={centerLon} places={data.nodes.map(node => node.address)} />
                </div>
            </div>
            <h3 className="text-base font-bold text-gray-500 tracking-wide w-full mt-4 mb-2 ml-2">{`Route ${data.type}`}</h3>
            <RouteNodesTable nodes={data.nodes} nodeType={data.type} />
        </div>
    )
}