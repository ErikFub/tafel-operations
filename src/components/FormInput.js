export default function FormInput({ label, id, placeholder, required, type, autofocus, defaultValue }) {
    const idAdj = id ? id : label.replace(' ', '-').toLowerCase()
    return (
        <div>
            <label htmlFor={idAdj} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}{required && <span className="text-red-600 font-medium text-sm"> *</span>}</label>
            <input defaultValue={defaultValue} type={type} name={idAdj} id={idAdj} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required={required} placeholder={placeholder} autoFocus={autofocus} />
        </div>
    )
}