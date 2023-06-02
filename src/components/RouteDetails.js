import RouteMap from "./RouteMap";
import RouteNodesTable from "./RouteNodesTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useMediaQuery } from "react-responsive";


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

    // Parse date
    const date = new Date(Date.parse(data.timestamp))

    // Construct route url
    let routeUrl = "https://www.google.com/maps/dir"
    for (const node of data.nodes) {
        routeUrl += `/${node.address.street}, ${node.address.zip} ${node.address.city}, ${node.address.country}`
    }

    // Responsive design
    const isWideScreen = useMediaQuery({ query: '(min-width: 1024px)'}) // corresponds to tailwind 'lg'
    const map = (
        <div className="h-64 lg:h-full mt-4 lg:mt-0">
            <RouteMap lat={centerLat} lon={centerLon} places={data.nodes.map(node => node.address)} />
        </div>
    )

    return (
        <div className="rounded-lg bg-white shadow px-5 py-3 ">
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                <div>
                    <h1 className="text-xl font-bold mt-2 mb-1">{data.name}</h1>
                    <h3 className="text-base font-bold text-gray-500">{`Created ${date.toISOString().split('T')[0]}`}</h3>
                    {!isWideScreen ? map : null}
                    <div className="lg:h-64 pt-20 w-full relative">
                        <div className="absolute bottom-0 w-full">
                            <p className="text-sm font-semibold text-gray-700 mb-1 ml-1">Send Google Maps link to</p>
                            <form onSubmit={e => {e.preventDefault();}} className="w-full">
                                <div className="flex">
                                    <select id="device" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5">
                                        <option selected value="phone">Phone</option>
                                        <option value="email">Email</option>
                                    </select>
                                    <input type="text" className="border-x-0 border-y-gray-300 w-3/5"></input>
                                    <button onClick={() => window.open(routeUrl, "_blank")} className="bg-gray-50 border border-gray-300 text-gray-900 justify-center text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 w-1/5 p-2.5 flex">
                                        <FontAwesomeIcon icon={icon({name: 'paper-plane'})} className='mr-1 p-0.5 text-gray-600' />
                                        <p>Send</p>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {isWideScreen ? map : null}
            </div>
            <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h3 className="text-base font-bold text-gray-500 tracking-wide w-full mt-3 mb-2 ml-2">{`Route ${data.type}`}</h3>
            <RouteNodesTable nodes={data.nodes} nodeType={data.type} />
        </div>
    )
}