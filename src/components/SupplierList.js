import SupplierItem from "./SupplierItem";
import ItemList from "./ItemList";

export default function SupplierList({ suppliers, handleRemoveSupplier }) {
    return (
        <ItemList>
            {suppliers.map(supplier => <SupplierItem key={supplier.id} supplier={supplier} handleRemoveSupplier={handleRemoveSupplier} />)}
        </ItemList>
    )
}