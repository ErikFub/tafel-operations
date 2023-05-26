import { useTafelApi } from '../contexts/ApiProvider'
import { useToastContext } from "../contexts/ToastContext"
import DeleteButton from './DeleteButton';



export default function CustomerItem({ customer, handleRemoveCustomer }) {
    const api = useTafelApi();
    const addToast = useToastContext();
    const handleDelete = () => {
        (async () => {
            const response = await api.delete('/customers/' + customer.id);
            if (response.ok) {
                handleRemoveCustomer(customer.id)
                addToast({text: "Successfully deleted customer", type: 'success'})
            }
            else {
                addToast({text: "Could not delete customer", type: 'error'})
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
            <DeleteButton handleDelete={handleDelete} />
        </li>
    )
}