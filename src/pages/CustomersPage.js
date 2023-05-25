import { useState, useEffect } from 'react';
import Body from "../components/Body";
import CustomerList from "../components/CustomerList"
import Spinner from '../components/Spinner';
import { useTafelApi } from '../contexts/ApiProvider';
import ListHeader from '../components/ListHeader';
import ModalForm from '../components/ModalForm';


export default function CustomersPage() {
    const [customers, setCustomers] = useState()
    const [showNewModal, setShowNewModal] = useState(false)

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

    return (
        <Body sidebar>
            {customers === undefined ? 
                <>
                    <ListHeader title={"customers"} />
                    <Spinner />
                </>
            :
                <>
                    <ListHeader title={"customers"} newButton setShowNewModal={setShowNewModal} />
                    <CustomerList customers={customers} setCustomers={setCustomers}/>
                    {showNewModal && <ModalForm setShowModal={setShowNewModal}/>}
                </>
            }
        </Body>
    );
}