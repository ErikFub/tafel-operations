import { useTafelApi } from '../contexts/ApiProvider'
import { useToastContext } from "../contexts/ToastContext"
import ThreeDotMenu from './ThreeDotMenu';
import DropdownItem from './DropdownItem';
import { useItemMenuVisibilityContext } from '../contexts/ItemMenuVisibilityContext';



export default function SupplierItem({ supplier, handleRemoveSupplier, setShowEditModal }) {
    const api = useTafelApi();
    const addToast = useToastContext();
    const setItemMenuVisibility = useItemMenuVisibilityContext().setItemMenuVisibility;


    const handleEdit = () => {
        setItemMenuVisibility(null);
        setShowEditModal(supplier.id);
    }

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
            <ThreeDotMenu id={supplier.id}>
                <DropdownItem text={'Edit'} handleClick={handleEdit} />
                <DropdownItem text={'Delete'} handleClick={handleDelete} />
            </ThreeDotMenu>
        </li>
    )
}