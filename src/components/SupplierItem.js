import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useTafelApi } from '../contexts/ApiProvider'
import { useToastContext } from "../contexts/ToastContext"



export default function SupplierItem({ supplier, handleRemoveSupplier }) {
    const api = useTafelApi();
    const addToast = useToastContext();
    const handleDelete = () => {
        (async () => {
            const response = await api.delete('/suppliers/' + supplier.id);
            if (response.ok) {
                handleRemoveSupplier(supplier.id)
                addToast({text: "Successfully deleted supplier", type: 'success'})
            }
            else {
                addToast({text: "Could not delete supplier", type: 'error'})
            }
        })();
    }
    return (
        <li id={supplier.id} class="p-3 columns-2 flex">
            <div className="w-full content-center grid">
                <p className="text-base font-bold">
                    {supplier.name}
                </p>
                {supplier.address !== null ?
                    <p className="text-sm font-light">
                        {supplier.address.street}, {supplier.address.zip} {supplier.address.city}
                    </p>
                :
                    undefined
                }
            </div>
            <div class="w-25px">
                <button onClick={handleDelete} type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center m-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <FontAwesomeIcon icon={icon({name: 'trash-can'})} />
                </button>
            </div>
        </li>
    )
}