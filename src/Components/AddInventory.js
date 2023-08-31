import React, { useEffect, useState } from 'react';


// This component controls the 'Add Inventory' fields and button
const AddInventory = ({ inventory, updateInventory }) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    const updateItem = (e, existingItem) => {
        e.preventDefault();
        var newQuantity = parseInt(existingItem.quantity) + parseInt(existingItem.standardQuantity);
        fetch(`http://localhost:3000/inventory/${existingItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: existingItem.name,
                quantity: newQuantity,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // Create a new array that includes all items except for the updated item
                const newInventory = inventory.map(item => {
                    // Replace the updated item at its original position
                    if (item.id === existingItem.id) {
                        return data;
                    } else {
                        return item;
                    }
                });
                // Call updateInventory with the new inventory data
                updateInventory(newInventory);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const addItem = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: name,
                quantity: quantity,
                standardQuantity: quantity,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // Create a new array that includes all items except for the updated item
                const newInventory = inventory.filter(item => item.id);
                // Append the updated item to the new array
                newInventory.push(data);
                // Call updateInventory with the new inventory data
                updateInventory(newInventory);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            console.log("Please enter an ID.");
            return;
        }
        const existingItem = inventory.find(item => item.id === parseInt(id));
        if (!existingItem) {
            if (name && quantity) {
                addItem(e);
            } else {
                console.log("ID not found. Please enter a valid ID.");
                return;
            }
        } else {
            updateItem(e, existingItem);
        }
    };

    return (    
        <div className="AddInventoryForm">
            <h1>Add Inventory</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input
                        name="ID-Input"
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Name:
                    <input
                        name="Name-Input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Quantity:
                    <input
                        name="Quantity-Input"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </label>
                <br></br>
                <input name="add-button" type="submit" value="Add Item To Fridge"/>
            </form>     
        </div>
    );
};

export default AddInventory;
    
    
