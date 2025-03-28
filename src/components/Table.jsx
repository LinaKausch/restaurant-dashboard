import React, { useState } from "react";

function Table({ table, assignWaiter, menuItems, onOrderClick }) {
    const [waiterName, setWaiterName] = useState("");
    const [numPeople, setNumPeople] = useState(table.numPeople || 0);

    const handleAssignWaiter = () => {
        if (waiterName) {
            assignWaiter(waiterName, table.number);
            setWaiterName("");
        }
    };

    const handlePeopleChange = (e) => {
        const value = e.target.value;
        setNumPeople(value);
    };

    const calculateTotalBill = () => {
        return Object.entries(table.orders).reduce((total, [orderName, quantity]) => {
            const menuItem = menuItems.find(item => item.name === orderName);  // Find the menu item
            if (menuItem) {
                total += menuItem.price * quantity;
            }
            return total;
        }, 0);
    };

    return (
        <div>
            <h3>Table {table.number}</h3>
            <p>Assigned Waiter: {table.waiter || "No waiter assigned"}</p>
            <p>Guests {numPeople} </p>

            <button onClick={onOrderClick}>Add Order</button>

            <input
                type="text"
                value={waiterName}
                onChange={(e) => setWaiterName(e.target.value)}
                placeholder="Enter Waiter's Name"
            />
            <button onClick={handleAssignWaiter}>Assign Waiter</button>

            <div>
                <label>Number of Guests: </label>
                <input
                    type="number"
                    value={numPeople}
                    onChange={handlePeopleChange}
                    min="0"
                    placeholder="Enter number of guests"
                />
            </div>
            <div>
                <p>Order:</p>

                <ul>
                    {Object.entries(table.orders).length > 0 ? (
                        Object.entries(table.orders).map(([orderName, quantity]) => {
                            const menuItem = menuItems.find(item => item.name === orderName);
                            return menuItem ? (
                                <li key={orderName}>
                                    {orderName} - ${menuItem.price} x {quantity} = ${menuItem.price * quantity}
                                </li>
                            ) : null;
                        })
                    ) : (
                        <p>No orders yet</p>
                    )}
                </ul>
            </div>
            <div>
                <p><strong>Total Bill: ${calculateTotalBill()}</strong></p>
            </div>
        </div>
    );
}

export default Table;

