import { faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import CustomerItem from "./CustomerItem";
import ItemList from "./ItemList";

export default function CustomerList({ customers, handleRemoveCustomer }) {
    return (
        <ItemList>
            {customers.map(customer => <CustomerItem key={customer.id} customer={customer} handleRemoveCustomer={handleRemoveCustomer} />)}
        </ItemList>
    )
}