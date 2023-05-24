import Body from "../components/Body";
import CustomerList from "../components/CustomerList"


export default function CustomersPage() {
    let customers = [
        {
            "first_name": "Erik",
            "last_name": "Fubel",
            "id": 1
        }
    ]
    return (
    <Body sidebar>
        <CustomerList customers={customers}/>
    </Body>
    );
}