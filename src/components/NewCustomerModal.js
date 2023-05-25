import Modal from "./Modal";
import FormInput from "./FormInput";
import { useTafelApi } from "../contexts/ApiProvider";
import { useToastContext } from "../contexts/ToastContext";

export default function NewCustomerModal({ setShowModal, handleAddCustomer }) {
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
            if (formJson['first-name'] === '' || formJson['last-name'] === '') {
                addToast({text: "First and last name cannot be empty", type: 'error'})
                return
            }
            const addressFields = {
                "street": formJson["street"],
                "zip": formJson["zip"],
                "city": formJson["city"],
                "country": formJson["country"],
            }
            const cntEmptyAddressFields = Object.values(addressFields).filter(field => field === '').length
            if (cntEmptyAddressFields && cntEmptyAddressFields < Object.values(addressFields).length) {
                addToast({text: "Either all or no address fields can be empty", type: 'error'})
                return
            }
        
            // Construct request body
            const postBody = {
                "first_name": formJson['first-name'],
                "last_name": formJson['last-name'],
                "address": addressFields
            }
            if (!Object.values(postBody.address).filter(v => v !== '').length) {
                delete postBody.address
            }

            // Post to server
            const response = await api.post('/customers', postBody);

            // Handle response
            if (response.ok) {
                setShowModal(false);
                handleAddCustomer(response.body);
                addToast({text: "Created customer", type: 'success'})
            }
            else {
                addToast({text: "Could not create customer", type: 'error'})
            }
        })();
    }
    return (
        <Modal setShowModal={setShowModal}>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new customer</h3>
            <form class="space-y-6" onSubmit={handleCreate}>
                <FormInput label={"First Name"} type={"text"} required />
                <FormInput label={"Last Name"} type={"text"} required />
                <FormInput label={"Street"} type={"text"} />
                <FormInput label={"ZIP"} type={"text"} />
                <FormInput label={"City"} type={"text"} />
                <FormInput label={"Country"} type={"text"} />
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Customer</button>
            </form>
        </Modal>
    );
};