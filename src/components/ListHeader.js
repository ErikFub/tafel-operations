import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function ListHeader({ title, newButton }) {
    return (
        <div className="columns-2 flex mb-3 mx-2">
            <div className="w-full">
                <h1 className="text-base font-bold text-gray-700 tracking-wide">
                    {title.toUpperCase()}
                </h1>
            </div>
            {(newButton) ? 
            <button type="button" class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2">
                    <FontAwesomeIcon icon={icon({name: 'plus'})} className='mr-1' /><p className='font-bold'>New</p>
            </button>
            :
            null
            }
        </div>
    )
}