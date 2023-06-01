/* global google */
import { DirectionsRenderer, GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";


function MapDirectionsRenderer({ places, travelMode }) {
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    const waypoints = places.map(p => ({
        location: { lat: p.lat, lng: p.lon },
        stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: travelMode,
            waypoints: waypoints
        },
        (result, status) => {
            console.log(result)
            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
            } else {
                setError(result);
            }
        }
    );
    }, [places, travelMode]);

    if (error) {
        return <h1>{error}</h1>;
    }
    return (
        directions && (
            <DirectionsRenderer directions={directions} />
        )
    );
}


export default function RouteMap({ lat, lon, places }) {
    const center = useMemo(() => ({ lat: lat, lng: lon}), [lat, lon])
    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY})

    return (
        <>
            {isLoaded ?
            <>
                <GoogleMap 
                    zoom={5} 
                    center={center} 
                    mapContainerClassName="w-full h-full"
                    options={{
                        streetViewControl: false, 
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                >
                    <MapDirectionsRenderer places={places} travelMode={google.maps.TravelMode.DRIVING} />
                </GoogleMap>
            </>
            :
                <Spinner />
            }
        </>
    )
}