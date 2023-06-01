import { useState, useEffect, useReducer } from 'react';
import Body from "../components/Body";
import SupplierList from '../components/SupplierList';
import Spinner from '../components/Spinner';
import { useTafelApi } from '../contexts/ApiProvider';
import ListHeader from '../components/ListHeader';
import NewSupplierModal from '../components/NewSupplierModal';
import EditSupplierModal from '../components/EditSupplierModal';
import itemListReducer from '../reducers/itemListReducer';


export default function SuppliersPage() {
    const [suppliers, dispatch] = useReducer(itemListReducer)
    const [showNewModal, setShowNewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)  // false if not shown, int (ID of supplier to be edited) if should be shown
    const [searchText, setSearchText] = useState('')

    // Fetch supplier data
    const api = useTafelApi();
    useEffect(() => {
        // UseEffect requires IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
        (async () => {
            const response = await api.get('/suppliers');
            if (response.ok) {
                dispatch({
                  type: "data_fetched_success",
                  items: response.body
                });
            }
            else {
                dispatch({
                  type: "data_fetched_failure"
                });
            }
        })();
      }, [api]);

    function handleRemoveSupplier(supplierId) {
        dispatch({
			type: 'removed',
			id: supplierId
		})
    }

    function handleAddSupplier(supplier) {
		dispatch({
			type: 'added',
			item: supplier
		})
    };

    function handleUpdateSupplier(supplier) {
        dispatch({
			type: 'updated',
			item: supplier
		})
    };

    return (
        <Body sidebar>
            {suppliers === undefined ? 
                <>
                    <ListHeader title={"suppliers"} newButton setShowNewModal={setShowNewModal} searchBar searchText={searchText} onSearchTextChange={setSearchText} />
                    <Spinner />
                </>
            :
                <>
                    <ListHeader title={"suppliers"} newButton setShowNewModal={setShowNewModal} searchBar searchText={searchText} onSearchTextChange={setSearchText} />
                    <SupplierList suppliers={suppliers} handleRemoveSupplier={handleRemoveSupplier} searchText={searchText} setShowEditModal={setShowEditModal} />
                    {showNewModal && <NewSupplierModal setShowModal={setShowNewModal} handleAddSupplier={handleAddSupplier} />}
                    {showEditModal && <EditSupplierModal setShowModal={setShowEditModal} handleUpdateSupplier={handleUpdateSupplier} suppliers={suppliers} supplierId={showEditModal} />}
                </>
            }
        </Body>
    );
}