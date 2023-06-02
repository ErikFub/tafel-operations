export default function DropdownItem({ text, handleClick }) {
    return (
        <li onClick={handleClick}>
            <p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{text}</p>
        </li>
    )
}