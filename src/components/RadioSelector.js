// A radio button like selector that list all options as horizontally adjacent buttons
export default function RadioSelector({ options, activeOption, setActiveOption }) {
    function handleClick(option) {
        setActiveOption(option)
    }
    
    // Adapted from https://flowbite.com/docs/forms/checkbox/
    return (
        <ul className="radio-selector overflow-hidden items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {options.map((option, index) =>
                <li onClick={() => handleClick(option.toLowerCase())} className={"w-full hover:cursor-pointer hover:bg-blue-800 hover:text-white font-medium text-sm px-5 py-2.5 text-center" + (index === 0 ? "border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" : (index === options.length -1 ? "dark:border-gray-600" : "border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600")) + (option.toLowerCase() === activeOption.toLowerCase() ? " active" : "")}>
                    <div className="flex w-full items-center tetxt-center">
                        <p className="w-full text-center">{option}</p>
                    </div>
                </li>
            )}
        </ul>
    )
}