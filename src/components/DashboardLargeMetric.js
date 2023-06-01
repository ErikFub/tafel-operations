import { useEffect, useState } from "react"
import { useTafelApi } from "../contexts/ApiProvider"
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function DashboardLargeMetric({ url, description, icon, accentColor, path }) {
    const [metric, setMetric] = useState()

    // Fetch count data
    const api = useTafelApi();
    useEffect(() => {
        // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
        (async () => {
            const response = await api.get(url);
            if (response.ok) {
                setMetric(response.body);
            }
            else {
                setMetric(null);
            }
        })();
    }, [api, url]);

    const navigate = useNavigate()


    return (
        <div className={`flex p-2 gap-4 ${path !== undefined && "hover:cursor-pointer"}`} onClick={path === undefined ? null : () => navigate(path)}>
            <div className={`text-${accentColor}-500 w-16 flex items-center justify-center rounded-lg `}>
                {icon}
            </div>
            <div>
                <div className={`text-${accentColor}-700 text-2xl font-bold`}>
                    {metric !== undefined ? metric : <Spinner />}
                </div>
                <div className={`text-${accentColor}-500 text-md font-semibold`}>
                    {description}
                </div>
            </div>
        </div>
    )
}