import CustomerItem from "./CustomerItem";
import ItemList from "./ItemList";

export default function CustomerList({ customers }) {
    return (
        <ItemList>
            {customers.map(customer => <CustomerItem customer={customer} />)}
        </ItemList>
    )
}