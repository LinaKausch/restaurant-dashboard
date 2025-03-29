import React from "react";

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
            <h3>Table #{table.number}</h3>
            <p>Assigned Waiter: {table.waiter || "No waiter assigned"}</p>
            <p>Guests {table.numPeople} </p>

            <div>
                <p><strong>Total Bill: €{calculateTotalBill()}</strong></p>
            </div>

            <button
                onClick={onOrderClick}
                disabled={!table.waiter || table.numPeople <= 0}
            >
                {Object.keys(table.orders).length > 0 ? "Update Order" : "Add Order"}
            </button>

            {Object.keys(table.orders).length > 0 && (
                <button onClick={() => setPayingTable(table.number)}>Bill</button>
            )}

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

            <button onClick={() => clearTable(table.number)}>
                Cancel Table
            </button>
        </div>

    );
}

export default Table;

