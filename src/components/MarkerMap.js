import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";
import { useMemo } from "react";


export default function MarkerMap({ lat, lon, places }) {
    const center = useMemo(() => ({ lat: lat, lng: lon}), [lat, lon])
    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY})

    return (
        <>
            {isLoaded ?
            <>
                <GoogleMap 
                    zoom={7} 
                    center={center} 
                    mapContainerClassName="w-full h-full"
                    options={{
                        streetViewControl: false, 
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                >
                    {places.map(place => (
                        <MarkerF position={{lat: place.address.lat, lng: place.address.lon}} />
                    ))}
                </GoogleMap>
            </>
            :
                <Spinner />
            }
        </>
    )
}