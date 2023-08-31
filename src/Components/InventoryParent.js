import React, { useEffect, useState } from 'react';
import AddInventory from './AddInventory';
import InventoryList from './InventoryList';
import UseItemsForm from './UseItemsForm';


const InventoryParent = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        // Fetch inventory data from the API
        fetch('http://localhost:3000/inventory')
            .then(response => response.json())
            .then(data => {
                setInventory(data);
            })
            .catch(error => {
                console.error('Error fetching inventory:', error);
            });
    }, []);

    const updateInventory = (newInventory) => {
        setInventory(newInventory);
    }

    return (
        <div>           
            <InventoryList inventory={inventory} />
            <AddInventory inventory={inventory} updateInventory={updateInventory} />
            <UseItemsForm inventory={inventory} updateInventory={updateInventory} />
        </div>
    );
}

export default InventoryParent;