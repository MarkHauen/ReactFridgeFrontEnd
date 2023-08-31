import React from 'react';

const InventoryList = ({ inventory }) => {
    return (
        <div className="InventoryList">
            <h1>Current Inventory</h1>
            <ul className="InventoryListItem">
                {inventory.map(item => (
                    <li key={item.id}>{item.name}:  {item.quantity}</li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;