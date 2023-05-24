import { faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import CustomerItem from "./CustomerItem";
import ItemList from "./ItemList";

export default function CustomerList({ customers, setCustomers }) {
    const handleRemoveCustomer = (customerId) => {
        setCustomers((customers) => {
          // Create a new array without the item to remove
          let updatedList = [...customers];
          updatedList = customers.filter((customer) => customer.id !== customerId);
          return updatedList;
        });
      };
    return (
        <ItemList>
            {customers.map(customer => <CustomerItem key={customer.id} customer={customer} handleRemoveCustomer={handleRemoveCustomer} />)}
        </ItemList>
    )
}