import SupplierItem from "./SupplierItem";
import ItemList from "./ItemList";

export default function SupplierList({ suppliers, handleRemoveSupplier, searchText }) {
    const suppliersFiltered = suppliers.filter(supplier => (supplier.name).toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    return (
        <ItemList>
            {suppliersFiltered.map(supplier => <SupplierItem key={supplier.id} supplier={supplier} handleRemoveSupplier={handleRemoveSupplier} />)}
        </ItemList>
    )
}