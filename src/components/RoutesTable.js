export default function RoutesTable({ routes }) {
    return (
        <div className="rounded-lg bg-white shadow px-5 py-1">
            <table className="w-full text-left">
                <thead className="uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Timestamp</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map(route => 
                        <tr>
                            <td>{route.name}</td>
                            <td>{route.timestamp}</td>
                            <td>{route.type}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}