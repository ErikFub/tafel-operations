import { useNavigate } from "react-router-dom"
import ItemTag from "./ItemTag"

export default function RoutesTable({ routes }) {
    const navigate = useNavigate()

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }

      function parseTimestamp(ts) {
        const date = new Date(Date.parse(ts))
        const dateStr =
        date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2)
        return dateStr
      }

    return (
        <div className="relative overflow-x-hidden shadow-md sm:rounded-lg">
            <table className="w-full text-base text-left dark:text-gray-400 table-fixed">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3 w-1/5">Created At</th>
                        <th scope="col" className="px-6 py-3 w-32 hidden md:table-cell"># Stops</th>
                        <th scope="col" className="px-6 py-3 w-44">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map(route => 
                        <tr key={route.id} onClick={() => navigate(`/routing/routes/${route.id}`)} className="hover:cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-3 font-semibold">{route.name}</td>
                            <td className="px-6 py-3">{parseTimestamp(route.timestamp)}</td>
                            <td className="px-6 py-3 hidden md:table-cell">{route.nodes.length}</td>
                            <td className="px-6 py-3"><ItemTag text={toTitleCase(route.type)} color={route.type === 'customers' ? 'green' : 'blue'} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}