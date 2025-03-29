import React, { useState } from "react";

function Table({
    table,
    assignWaiter,
    menuItems,
    onOrderClick,
    setPayingTable,
    updateNumPeople,
    waiters,
    clearTable
}) {

    const [showSettings, setShowSettings] = useState(false);


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
        <div className="table-card">
            <h3 className="table-number">Table #{table.number}</h3>
            <p>Assigned Waiter: <strong>{table.waiter || "No waiter assigned"}</strong></p>
            <p>Guests: <strong>{table.numPeople}</strong></p>

            <div className="total-price">
                <p><strong>Total Bill: €{calculateTotalBill()}</strong></p>
            </div>
            <div className="table-buttons">
                <button
                    onClick={onOrderClick}
                    disabled={!table.waiter || table.numPeople <= 0}
                >
                    {Object.keys(table.orders).length > 0 ? "Update Order" : "Add Order"}
                </button>

                {Object.keys(table.orders).length > 0 && (
                    <button onClick={() => setPayingTable(table.number)}>Bill to pay</button>
                )}
            </div>
            <button
                onClick={() => setShowSettings(prev => !prev)}
                className="toggle-settings-btn"
            >
                {showSettings ? "Hide Settings" : "Show Settings"}
            </button>
            {showSettings && (
                <div className="table-settings">
                    <hl></hl>
                    <h4>Table settings</h4>
                    <div>
                        <label>Number of Guests: </label>
                        <input className="number-input input"
                            type="number"
                            value={table.numPeople}
                            onChange={(e) => updateNumPeople(table.number, e.target.value)}
                            min="0"
                            placeholder="Enter number of guests"
                        />
                    </div>
                    <div className="waiter-choice">
                        <label>Assign Waiter: </label>
                        <select className="input"
                            value={table.waiter}
                            onChange={(e) => assignWaiter(e.target.value, table.number)}
                        >
                            <option value="">-- Select Waiter --</option>
                            {waiters.map((waiter, index) => (
                                <option key={index} value={waiter}>{waiter}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={() => {
                        const confirmed = window.confirm("Are you sure you want to cancel this table?");
                        if (confirmed) clearTable(table.number);
                    }}>
                        Cancel Table
                    </button>
                </div>
            )}
        </div>

    );
}

export default Table;

