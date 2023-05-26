import { useState, useEffect } from 'react';
import Body from "../components/Body";
import CustomerList from "../components/CustomerList"
import Spinner from '../components/Spinner';
import { useTafelApi } from '../contexts/ApiProvider';
import ListHeader from '../components/ListHeader';
import NewCustomerModal from '../components/NewCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';


export default function CustomersPage() {
    const [customers, setCustomers] = useState()
    const [showNewModal, setShowNewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)  // false if not shown, int (ID of customer to be edited) if should be shown
    const [searchText, setSearchText] = useState('')

    // Fetch customer data
    const api = useTafelApi();
    useEffect(() => {
        // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
        (async () => {
            const response = await api.get('/customers');
            if (response.ok) {
                setCustomers(response.body);
            }
            else {
                setCustomers(null);
            }
        })();
      }, [api]);

      const handleRemoveCustomer = (customerId) => {
        setCustomers((customers) => {
          // Create a new array without the item to remove
          let updatedList = [...customers];
          updatedList = customers.filter((customer) => customer.id !== customerId);
          return updatedList;
        });
      };

      const handleAddCustomer = (customer) => {
        setCustomers((customers) => {
          // Create a new array without the item to remove
          let updatedList = [...customers, customer];
          return updatedList;
        });
      };

      const handleUpdateCustomer = (customer) => {
        setCustomers((customers) => {
          // Create a new array without the item to remove
          let updatedList = customers.map(customerElement => customerElement.id === customer.id ? customer : customerElement);
          return updatedList;
        });
      };

    return (
        <Body sidebar>
            {customers === undefined ? 
                <>
                    <ListHeader title={"customers"} newButton setShowNewModal={setShowNewModal} searchBar searchText={searchText} onSearchTextChange={setSearchText}/>
                    <Spinner />
                </>
            :
                <>
                    <ListHeader title={"customers"} newButton setShowNewModal={setShowNewModal} searchBar searchText={searchText} onSearchTextChange={setSearchText} />
                    <CustomerList customers={customers} handleRemoveCustomer={handleRemoveCustomer} searchText={searchText} setShowEditModal={setShowEditModal} />
                    {showNewModal && <NewCustomerModal setShowModal={setShowNewModal} handleAddCustomer={handleAddCustomer} />}
                    {showEditModal && <EditCustomerModal setShowModal={setShowEditModal} handleUpdateCustomer={handleUpdateCustomer} customers={customers} customerId={showEditModal} />}
                </>
            }
        </Body>
    );
}