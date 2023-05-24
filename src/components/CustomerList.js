import CustomerItem from "./CustomerItem";
import ItemList from "./ItemList";

export default function CustomerList({ customers }) {
    return (
        <ItemList>
            {customers.map(customer => <CustomerItem key={customer.id} customer={customer} />)}
        </ItemList>
    )
}