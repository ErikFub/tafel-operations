export default function FormInput({ label, id, placeholder, required, type}) {
    const idAdj = id ? id : label.replace(' ', '-').toLowerCase()
    return (
        <div>
            <label for={idAdj} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} name={idAdj} id={idAdj} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={required} placeholder={placeholder} />
        </div>
    )
}