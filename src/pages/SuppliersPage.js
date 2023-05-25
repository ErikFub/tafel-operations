import { useState, useEffect } from 'react';
import Body from "../components/Body";
import SupplierList from '../components/SupplierList';
import Spinner from '../components/Spinner';
import { useTafelApi } from '../contexts/ApiProvider';
import ListHeader from '../components/ListHeader';
import NewSupplierModal from '../components/NewSupplierModal';


export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState()
    const [showNewModal, setShowNewModal] = useState(false)
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

    return (
        <Body sidebar>
            {suppliers === undefined ? 
                <>
                    <ListHeader title={"suppliers"} />
                    <Spinner />
                </>
            :
                <>
                    <ListHeader title={"suppliers"} newButton setShowNewModal={setShowNewModal} searchBar searchText={searchText} onSearchTextChange={setSearchText} />
                    <SupplierList suppliers={suppliers} handleRemoveSupplier={handleRemoveSupplier} searchText={searchText} />
                    {showNewModal && <NewSupplierModal setShowModal={setShowNewModal} handleAddSupplier={handleAddSupplier} />}
                </>
            }
        </Body>
    );
}