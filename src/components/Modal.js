export default function Modal({ children, setShowModal, width }) {
    return (
        <div tabindex="-1" aria-hidden="false" className="fixed grid place-items-center top-0 bottom-0 left-0 right-0 z-50 w-full bg-gray-100 bg-opacity-50 overflow-y-auto overflow-x-hidden outline-none">
            <div className="sm:w-1/2 md:w-[500px] w-4/5 relative bg-white rounded-lg shadow dark:bg-gray-700 top-1 bottom-1">
                <button onClick={() => setShowModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="false" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
};