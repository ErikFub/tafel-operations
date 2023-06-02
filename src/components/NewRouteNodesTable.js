import { useState } from "react"
import { SearchBar } from "./SearchBar"

export default function NewRouteNodesTable({ nodes, nodeType, handleCheckboxChange }) {
    const [searchText, setSearchText] = useState("");

    const filteredNodes = nodes.filter(node => 
        (node.first_name + (nodeType === 'customers' ? " " : node.name) + node.last_name).toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
        (`${node.address.street}, ${node.address.zip} ${node.address.city}, ${node.address.country}`).toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );

    // Adapted from https://flowbite.com/docs/components/tables/#table-search
    return (
        <div className="relative overflow-x-hidden shadow-md sm:rounded-lg">
            <div className="pb-0 bg-gray-50 dark:bg-gray-900">
                <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4 w-5">
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 w-7/12">
                            Address
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNodes.map(node =>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id={node.id} onChange={handleCheckboxChange} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {nodeType === "customers" ? node.first_name + " " + node.last_name : (nodeType === "suppliers" ? node.name : "error")}
                        </th>
                        <td className="px-6 py-4">
                            {`${node.address.street}, ${node.address.zip} ${node.address.city}, ${node.address.country}`}
                        </td>
                    </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}