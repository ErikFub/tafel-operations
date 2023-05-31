import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";
import { useMemo } from "react";

export default function Map({ lat, lon }) {
    const center = useMemo(() => ({ lat: lat, lng: lon}), [lat, lon])
    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY})

    return (
        <>
            {isLoaded ?
            <>
                <GoogleMap zoom={10} center={center} mapContainerClassName="w-full h-64"></GoogleMap>
                <p>lakdfaksdnf</p>
            </>
            :
                <Spinner />
            }
        </>
    )
}