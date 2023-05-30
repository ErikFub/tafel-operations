import Modal from "./Modal";
import FormInput from "./FormInput";
import { useTafelApi } from "../contexts/ApiProvider";
import { useToastContext } from "../contexts/ToastContext";

export default function NewRouteModal({ setShowModal }) {
    const api = useTafelApi();
    const addToast = useToastContext();
    const handleCreate = (e) => {
        (async () => {
            // Prevent the browser from reloading the page
            e.preventDefault();
        
            // Read the form data
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());

            // Validate data
            if (formJson['name'] === '') {
                addToast({text: "Name cannot be empty", type: 'error'})
                return
            }
        
            // Construct request body
            const postBody = {
                "name": formJson['name']
            }

            // Post to server
            const response = await api.post('/routing/routes', postBody);

            // Handle response
            if (response.ok) {
                // TODO: redirect to route details page
                addToast({text: "Created route", type: 'success'})
            }
            else {
                addToast({text: "Could not create route", type: 'error'})
            }
        })();
    }
    return (
        <Modal setShowModal={setShowModal}>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new route</h3>
            <form class="space-y-6" onSubmit={handleCreate}>
                <FormInput label={"Name"} type={"text"} required autofocus={true} />
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Route</button>
            </form>
        </Modal>
    );
};