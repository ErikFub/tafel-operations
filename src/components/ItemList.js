import { Children } from "react"

export default function ItemList({ children }) {
    return (
        <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow px-5 py-1">
            {Children.count(children) === 0 ?
            <li class="p-3 columns-2 flex">
                <div className="w-full content-center grid">
                    <p className="text-base font-bold">
                        No results
                    </p>
                </div>
            </li>
            :
            children}
        </ul>
        
    )
}