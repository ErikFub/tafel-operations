import { useState, useEffect } from 'react';
import Body from "../components/Body";
import CustomerList from "../components/CustomerList"
import Spinner from '../components/Spinner';


const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

export default function CustomersPage() {
    const [customers, setCustomers] = useState()

    // Fetch customer data
    useEffect(() => {
        // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
        (async () => {
          const response = await fetch(BASE_API_URL + '/api/customers');
          if (response.ok) {
            const results = await response.json();
            setCustomers(results);
          }
          else {
            setCustomers(null);
          }
        })();
      }, []);

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