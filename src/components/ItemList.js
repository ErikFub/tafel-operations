export default function ItemList({ children }) {
    return (
        <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow px-5 py-1">
            {children}
        </ul>
    )
}