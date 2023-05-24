export default function ItemList({ children }) {
    return (
        <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow p-5">
            {children}
        </ul>
    )
}