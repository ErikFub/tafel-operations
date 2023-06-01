import Modal from "./Modal";
import FormInput from "./FormInput";
import { useTafelApi } from "../contexts/ApiProvider";
import { useToastContext } from "../contexts/ToastContext";
import FormAddressSection from "./FormAddressSection";

export default function EditCustomerModal({ setShowModal, customers, customerId, handleUpdateCustomer }) {
    const api = useTafelApi();
    const addToast = useToastContext();
    const handleUpdate = (e) => {
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
            const response = await api.put('/customers/' + customerId, postBody);

            // Handle response
            if (response.ok) {
                setShowModal(false);
                handleUpdateCustomer(response.body);
                addToast({text: "Updated customer", type: 'success'})
            }
            else {
                addToast({text: "Could not update customer", type: 'error'})
            }
        })();
    }
    
    const customer = customers.filter(customer => customer.id === customerId)[0]

    return (
        <Modal setShowModal={setShowModal}>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit customer</h3>
            <form class="space-y-6" onSubmit={handleUpdate}>
                <FormInput label={"First Name"} type={"text"} required autofocus={true} defaultValue={customer.first_name} />
                <FormInput label={"Last Name"} type={"text"} required defaultValue={customer.last_name} />
                <FormAddressSection defaultValues={customer.address === null ? {} : {street: customer.address.street, zip: customer.address.zip, city: customer.address.city, country: customer.address.country}}/>
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save changes
                </button>
            </form>
        </Modal>
    );
};