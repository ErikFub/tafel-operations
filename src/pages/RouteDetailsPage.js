import Body from "../components/Body";
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from "react";
import { useTafelApi } from "../contexts/ApiProvider";
import Spinner from "../components/Spinner";
import RouteDetails from "../components/RouteDetails";


export default function RouteDetailsPage() {
  const location = useLocation()
  const routeId = useMemo(() => location.pathname.split('/').slice(-1), [location])

  const [data, setData] = useState()

  // Fetch route data
  const api = useTafelApi();
  useEffect(() => {
      // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
      (async () => {
          const response = await api.get(`/routing/routes/${routeId}`);
          if (response.ok) {
              setData(response.body);
          }
          else {
              setData(null);
          }
      })();
  }, [api, routeId]);

  return (
    <Body sidebar>
        {data === undefined ?
          <Spinner />
        :
          <RouteDetails data={data} />
        }
    </Body>
  );
}
