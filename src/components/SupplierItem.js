import { useTafelApi } from '../contexts/ApiProvider'
import { useToastContext } from "../contexts/ToastContext"
import DeleteButton from './DeleteButton';



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
            <DeleteButton handleDelete={handleDelete} />
        </li>
    )
}