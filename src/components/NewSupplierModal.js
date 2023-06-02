import Modal from "./Modal";
import FormInput from "./FormInput";
import { useTafelApi } from "../contexts/ApiProvider";
import { useToastContext } from "../contexts/ToastContext";
import FormAddressSection from "./FormAddressSection";
import FormSectionHeader from "./FormSectionHeader";

export default function NewSupplierModal({ setShowModal, handleAddSupplier }) {
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
                "name": formJson['name'],
                "address": addressFields
            }
            if (!Object.values(postBody.address).filter(v => v !== '').length) {
                delete postBody.address
            }

            // Post to server
            const response = await api.post('/suppliers', postBody);

            // Handle response
            if (response.ok) {
                setShowModal(false);
                handleAddSupplier(response.body);
                addToast({text: "Created supplier", type: 'success'})
            }
            else {
                addToast({text: "Could not create supplier", type: 'error'})
            }
        })();
    }
    return (
        <Modal setShowModal={setShowModal}>
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new supplier</h3>
            <form className="space-y-5" onSubmit={handleCreate}>
                <FormSectionHeader text={"General"} />
                <FormInput label={"Name"} type={"text"} required autofocus={true} />
                <FormSectionHeader text={"Address"} />
                <FormAddressSection />
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Supplier</button>
            </form>
        </Modal>
    );
};