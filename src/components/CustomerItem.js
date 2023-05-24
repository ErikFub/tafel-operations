import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useTafelApi } from '../contexts/ApiProvider'
import { useNavigate } from 'react-router-dom';



export default function CustomerItem({ customer, handleRemoveCustomer }) {
    const api = useTafelApi();
    const handleDelete = () => {
        (async () => {
            const response = await api.delete('/customers/' + customer.id);
            if (response.ok) {
                handleRemoveCustomer(customer.id)
                // Todo: toast that deletion was successful
            }
            else {
                // Todo: toast that deletion failed
            }
        })();
    }
    return (
        <li id={customer.id} class="p-3 columns-2 flex">
            <div className="w-full content-center grid">
                <p className="text-base font-bold">
                    {customer.first_name} {customer.last_name}
                </p>
                {customer.address !== null ?
                    <p className="text-sm font-light">
                        {customer.address.street}, {customer.address.zip} {customer.address.city}
                    </p>
                :
                    undefined
                }
            </div>
            <div class="w-30px">
                <button onClick={handleDelete} type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center m-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <FontAwesomeIcon icon={icon({name: 'trash-can'})} />
                </button>
            </div>
        </li>
    )
}