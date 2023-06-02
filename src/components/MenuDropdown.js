export default function MenuDropdown({ children }) {
    return (
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {children}
            </ul>
        </div>
    )
}