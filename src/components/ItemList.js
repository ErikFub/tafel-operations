import { Children, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import ItemMenuVisibilityContext from "../contexts/ItemMenuVisibilityContext"

export default function ItemList({ children }) {
    const [itemMenuVisibility, setItemMenuVisibility] = useState(null)
    return (
        <ItemMenuVisibilityContext.Provider value={{ itemMenuVisibility, setItemMenuVisibility }}>
            <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow px-5 py-1">
                {Children.count(children) === 0 ?
                <li class="p-3 columns-2 flex">
                    <div className="w-full content-center grid text-center text-gray-500">
                        <p className="text-base font-bold">
                        <FontAwesomeIcon icon={icon({name: 'face-frown', style: 'regular'})} className='mr-2' />
                        No results
                        </p>
                    </div>
                </li>
                :
                children}
            </ul>
        </ItemMenuVisibilityContext.Provider>
    )
}