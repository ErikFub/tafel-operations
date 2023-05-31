export default function RouteNodesTable({ nodes, nodeType }) {
    // Adapted from https://flowbite.com/docs/components/tables/#table-search
    return (
        <div class="relative overflow-x-hidden shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 md:w-28">
                            Position
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3 w-1/2">
                            Address
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {nodes.map((node, index) =>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 px-6 py-4 font-semibold">
                            {String.fromCharCode(index+65)}
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {nodeType === "customers" ? node.first_name + " " + node.last_name : (nodeType === "suppliers" ? node.name : "error")}
                        </th>
                        <td class="px-6 py-4">
                            {`${node.address.street}, ${node.address.zip} ${node.address.city}, ${node.address.country}`}
                        </td>
                    </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}