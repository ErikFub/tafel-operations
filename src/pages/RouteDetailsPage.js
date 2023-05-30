import Body from "../components/Body";
import { useLocation } from 'react-router-dom';


export default function RouteDetailsPage() {
  const location = useLocation()
  const routeId = location.pathname.split('/').slice(-1)
  return (
    <Body sidebar>
        {`Route ${routeId}`}
    </Body>
  );
}
