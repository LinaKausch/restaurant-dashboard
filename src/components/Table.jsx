import React, { useState } from "react";

function Table({ table, assignWaiter }) {
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

    return (
        <div>
            <h3>Table {table.number}</h3>
            <p>Assigned Waiter: {table.waiter || "No waiter assigned"}</p>
            <p>Guests {numPeople} </p>

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
        </div>
    );
}

export default Table;

