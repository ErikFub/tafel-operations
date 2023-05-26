import { useState, useEffect } from 'react';
import Body from "../components/Body";
import SupplierList from '../components/SupplierList';
import Spinner from '../components/Spinner';
import { useTafelApi } from '../contexts/ApiProvider';
import ListHeader from '../components/ListHeader';
import NewSupplierModal from '../components/NewSupplierModal';
import EditSupplierModal from '../components/EditSupplierModal';


export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState()
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
                setSuppliers(response.body);
            }
            else {
                setSuppliers(null);
            }
        })();
      }, [api]);

      const handleRemoveSupplier = (supplierId) => {
        setSuppliers((suppliers) => {
          // Create a new array without the item to remove
          let updatedList = [...suppliers];
          updatedList = suppliers.filter((supplier) => supplier.id !== supplierId);
          return updatedList;
        });
      };

      const handleAddSupplier = (supplier) => {
        setSuppliers((suppliers) => {
          // Create a new array without the item to remove
          let updatedList = [...suppliers, supplier];
          return updatedList;
        });
      };

      const handleUpdateSupplier = (supplier) => {
        setSuppliers((suppliers) => {
          // Create a new array without the item to remove
          let updatedList = suppliers.map(supplierElement => supplierElement.id === supplier.id ? supplier : supplierElement);
          return updatedList;
        });
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