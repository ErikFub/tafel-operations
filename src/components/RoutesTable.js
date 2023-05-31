import { useNavigate } from "react-router-dom"

export default function RoutesTable({ routes }) {
    const navigate = useNavigate()
    return (
        <div className="relative overflow-x-hidden shadow-md sm:rounded-lg">
            <table className="w-full text-base text-left dark:text-gray-400 table-fixed">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Created At</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map(route => 
                        <tr onClick={() => navigate(`/routing/routes/${route.id}`)} className="hover:cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-3 font-semibold">{route.name}</td>
                            <td className="px-6 py-3">{route.timestamp}</td>
                            <td className="px-6 py-3">{route.type}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}