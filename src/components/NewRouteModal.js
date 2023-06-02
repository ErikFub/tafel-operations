import Modal from "./Modal";
import FormInput from "./FormInput";
import { useTafelApi } from "../contexts/ApiProvider";
import { useToastContext } from "../contexts/ToastContext";
import NewRouteNodesTable from "./NewRouteNodesTable";
import { useEffect, useState } from "react";
import RouteTypeSelector from "./RouteTypeSelector";
import { useNavigate } from "react-router-dom";

export default function NewRouteModal({ setShowModal }) {
    const [availableNodes, setAvailableNodes] = useState()
    const [selectedNodes, setSelectedNodes] = useState([])
    const [routeType, setRouteType] = useState("")

    // Fetch nodes data
    const api = useTafelApi();
    useEffect(() => {
        // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
        (async () => {
            if (routeType === ""){
                return
            }
            const response = await api.get('/' + routeType);
            if (response.ok) {
                // Filter out nodes that do not have an address
                setAvailableNodes(response.body.filter(element => element.address !== null));
            }
            else {
                setAvailableNodes(null);
            }
        })();
    }, [api, routeType]);

    const handleCheckboxChange = (event) => {
      const checkboxId = event.target.id;
  
      if (event.target.checked) {
        setSelectedNodes((prevCheckedIds) => [...prevCheckedIds, checkboxId]);
      } else {
        setSelectedNodes((prevCheckedIds) =>
          prevCheckedIds.filter((id) => id !== checkboxId)
        );
      }
    };

    const navigate = useNavigate()

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
            if (selectedNodes.length < 2) {
                addToast({text: "Route must include at least two nodes", type: 'error'})
                return
            }

            // Get optimal route
            const solverResponse = await api.post('/routing/solver', {"type": routeType, "nodes": selectedNodes});
            if (!solverResponse.ok) {
                addToast({text: "Could not retrieve optimal route and aborted route creation", type: 'error'})
                return
            }

            // Construct request body
            const postBody = {
                "name": formJson['name'],
                "type": routeType,
                "nodes": solverResponse.body
            }

            // Post to server
            const response = await api.post('/routing/routes', postBody);

            // Handle response
            if (response.ok) {
                addToast({text: "Successfully created route", type: "success"})
                navigate(`/routing/routes/${response.body}`)
            }
            else {
                addToast({text: "Could not create route", type: 'error'})
            }
        })();
    }
    return (
        <div className="w-full">
            <Modal setShowModal={setShowModal}>
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new route</h3>
                <RouteTypeSelector routeType={routeType} setRouteType={setRouteType}/>
                {routeType !== "" &&
                <form className="mt-5" onSubmit={handleCreate}>
                    <FormInput label={"Name"} type={"text"} required autofocus={true} />
                    {(availableNodes !== undefined && availableNodes !== null)  &&
                    <>
                        <p className="mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">{`Add ${routeType}`}</p>
                        <NewRouteNodesTable nodes={availableNodes} nodeType={routeType} handleCheckboxChange={handleCheckboxChange} />
                        <button type="submit" className="w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Route</button>
                    </>
                    }
                </form>
                }
            </Modal>
        </div>
    );
};