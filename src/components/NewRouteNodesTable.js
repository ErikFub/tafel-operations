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
        <div class="relative overflow-x-hidden shadow-md sm:rounded-lg">
            <div class="pb-0 bg-white dark:bg-gray-900">
                <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4 w-1/6">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3 w-2/6">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3 w-3/6">
                            Address
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNodes.map(node =>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id={node.id} onChange={handleCheckboxChange} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
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