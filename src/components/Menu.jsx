import React, { useState } from "react";
import "./Menu.css";

function Menu({ menuItems, setMenuItems }) {

    const [newMenuItem, setNewMenuItem] = useState("");
    const [newItemPrice, setNewItemPrice] = useState(0);

    const addMenuItem = () => {
        if (!newMenuItem || !newItemPrice) return;

        const newItem = {
            id: menuItems.length + 1,
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
        <div className="menu-page">
            <div className="menu">
                <h2>Menu</h2>
                <p>Toggle on/off - availability of the dish </p>
                <div className="menu-grid">
                    {menuItems.map(item => (
                        <div key={item.id} className="menu-card">
                            <div className="menu-info">
                                <span className="menu-name">{item.name}</span>
                                <span className="menu-price">€{item.price}</span>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={item.available}
                                    onChange={() => toggleAvailability(item.id)}
                                />
                                <span className="slider" />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="add-meals">
                <h2>Add a dish</h2>
                <p>Add new dish to the menu</p>
                <div className="add-form">
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
        </div>
    );
}

export default Menu;