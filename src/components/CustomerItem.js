export default function CustomerItem({ customer }) {
    return (
        <li key={customer.id}>
            <p>{customer.first_name} {customer.last_name}</p>
        </li>
    )
}