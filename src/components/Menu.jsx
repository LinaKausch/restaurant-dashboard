import React, { useState } from "react";

function Menu({ menuItems, setMenuItems }) {

    const [newMenuItem, setNewMenuItem] = useState("");
    const [newItemPrice, setNewItemPrice] = useState(0);

    const addMenuItem = () => {
        if (!newMenuItem || !newItemPrice) return;

        const newItem = {
            id: Date.now(),
            name: newMenuItem,
            price: parseFloat(newItemPrice),
        };

        setMenuItems(prev => [...prev, newItem]);

        setNewMenuItem("");
        setNewItemPrice("");
    };

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menuItems.map(item => {
                    return (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                        </li>
                    )
                })}
            </ul>
            <div>
                <h2>Add meals of the week</h2>
                <input
                    type="text"
                    placeholder="Item name"
                    value={newMenuItem}
                    onChange={(e) => setNewMenuItem(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                />
                <button onClick={addMenuItem}>Add Item</button>
            </div>
        </div>
    );
}

export default Menu;