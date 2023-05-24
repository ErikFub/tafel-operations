import { useState } from 'react';
import Body from "../components/Body";
import CustomerList from "../components/CustomerList"
import Spinner from '../components/Spinner';


export default function CustomersPage() {
    const [customers, setCustomers] = useState()
    return (
        <Body sidebar>
            {customers === undefined ? 
                <Spinner />
            :
                <CustomerList customers={customers}/>
            }
        </Body>
    );
}