import { useEffect, useState } from "react";
import Body from "../components/Body";
import ListHeader from "../components/ListHeader";
import NewRouteModal from "../components/NewRouteModal";
import RoutesTable from "../components/RoutesTable";
import { useTafelApi } from "../contexts/ApiProvider";
import Spinner from "../components/Spinner";


export default function RoutingPage() {
    const [routes, setRoutes] = useState()
    const [showNewModal, setShowNewModal] = useState(false)

    // Fetch routes data
    const api = useTafelApi();
    useEffect(() => {
        // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
        (async () => {
            const response = await api.get('/routing/routes');
            if (response.ok) {
                setRoutes(response.body);
            }
            else {
                setRoutes(null);
            }
        })();
    }, [api]);

    return (
        <Body sidebar>
            <ListHeader title={"All Routes"} newButton setShowNewModal={setShowNewModal} />
            {routes === undefined ? 
               <Spinner />
            :
                <>
                    <RoutesTable routes={routes}/>
                    {showNewModal && <NewRouteModal setShowModal={setShowNewModal} />}
                </>
            }
        </Body>
    );
}
