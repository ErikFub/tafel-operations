import { useState, useEffect, useReducer } from 'react';
import Body from "../components/Body";
import CustomerList from "../components/CustomerList"
import Spinner from '../components/Spinner';
import { useTafelApi } from '../contexts/ApiProvider';
import ListHeader from '../components/ListHeader';
import NewCustomerModal from '../components/NewCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';
import itemListReducer from '../reducers/itemListReducer';


export default function CustomersPage() {
    const [customers, dispatch] = useReducer(itemListReducer)
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
                dispatch({
                  type: "data_fetched_success",
                  items: response.body
                });
            }
            else {
                dispatch({
                  type: "data_fetched_failure"
                });
            }
        })();
      }, [api]);

    function handleRemoveCustomer(customerId) {
        dispatch({
			type: 'removed',
			id: customerId
		})
    }

    function handleAddCustomer(customer) {
		dispatch({
			type: 'added',
			item: customer
		})
    };

    function handleUpdateCustomer(customer) {
        dispatch({
			type: 'updated',
			item: customer
		})
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