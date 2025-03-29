import React from "react";

function Table({ table, assignWaiter, menuItems, onOrderClick, handlePay, updateNumPeople, waiters }) {

    const calculateTotalBill = () => {
        return Object.entries(table.orders).reduce((total, [orderName, quantity]) => {
            const menuItem = menuItems.find(item => item.name === orderName);
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
            <p>Guests {table.numPeople} </p>

            <button
                onClick={onOrderClick}
                disabled={!table.waiter || table.numPeople <= 0}
            >
                Add Order
            </button>

            <label>Assign Waiter:</label>
            <select
                value={table.waiter}
                onChange={(e) => assignWaiter(e.target.value, table.number)}
            >
                <option value="">-- Select Waiter --</option>
                {waiters.map((waiter, index) => (
                    <option key={index} value={waiter}>{waiter}</option>
                ))}
            </select>


            <div>
                <label>Number of Guests: </label>
                <input
                    type="number"
                    value={table.numPeople}
                    onChange={(e) => updateNumPeople(table.number, e.target.value)}
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
                                    {orderName} - €{menuItem.price} x {quantity} = ${menuItem.price * quantity}
                                </li>
                            ) : null;
                        })
                    ) : (
                        <p>No orders yet</p>
                    )}
                </ul>
            </div>
            <div>
                <p><strong>Total Bill: €{calculateTotalBill()}</strong></p>
            </div>

            {Object.keys(table.orders).length > 0 && (
                <button onClick={() => handlePay(table.number)}>💸 Pay & Clear Table</button>
            )}
        </div>
    );
}

export default Table;

