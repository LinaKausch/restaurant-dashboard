import React, { useState } from "react";
import "./Menu.css";

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

    const toggleAvailability = (id) => {
        setMenuItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, available: !item.available }
                    : item
            )
        );
    };


    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menuItems.map(item => {
                    return (
                        <li key={item.id}>
                            {item.name} - €{item.price}
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={item.available}
                                    onChange={() => toggleAvailability(item.id)}
                                />
                                <span className="slider">
                                </span>
                            </label>
                            {/* {item.available ? " ✅" : " ❌"}
                            <button onClick={() => toggleAvailability(item.id)}>
                                {item.available ? "Mark Unavailable" : "Mark Available"}
                            </button> */}
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