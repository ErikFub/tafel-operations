import CustomerItem from "./CustomerItem";
import ItemList from "./ItemList";

export default function CustomerList({ customers, handleRemoveCustomer, searchText }) {
    const customersFiltered = customers.filter(customer => (customer.first_name + ' ' + customer.last_name).toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    return (
        <ItemList>
            {customersFiltered.map(customer => <CustomerItem key={customer.id} customer={customer} handleRemoveCustomer={handleRemoveCustomer} />)}
        </ItemList>
    )
}