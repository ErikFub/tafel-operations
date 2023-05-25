import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { SearchBar } from './SearchBar'

export default function ListHeader({ title, newButton, setShowNewModal, searchBar, searchText, onSearchTextChange }) {
    return (
        <>
            {(searchBar) ?
            <h1 className="text-base font-bold text-gray-700 tracking-wide mb-2">
                {title.toUpperCase()}
            </h1>
            :
            null
            }
            <div className="columns-2 flex mb-3 gap-3">
                {(searchBar) ?
                <div className='w-full'>
                    <SearchBar searchText={searchText} onSearchTextChange={onSearchTextChange}></SearchBar>
                </div>
                :
                <h1 className="text-base font-bold text-gray-700 tracking-wide w-full">
                    {title.toUpperCase()}
                </h1>
                }

                {(newButton) ? 
                <button onClick={() => setShowNewModal(true)} type="button" class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40">
                        <FontAwesomeIcon icon={icon({name: 'plus'})} className='mr-1' /><p className='font-bold'>New</p>
                </button>
                :
                null
                }
            </div>
        </>
    )
}