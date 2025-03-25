import React from "react";
import Table from "./table";

function TableList({ tables, setTables }){

  const assignWaiter = (name, tableNumber) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.number === tableNumber
          ? { ...table, waiter: name }
          : table
      )
    );
  };

    const updateNumPeople = (numPeople, tableNumber) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.number === tableNumber
                    ? { ...table, numPeople } // Update number of people for the correct table
                    : table
            )
        );
    };

    return (
        <div>
            <h2>Tables List</h2>
            {tables.map((table) => (
                <Table
                    key={table.number}
                    table={table}
                    assignWaiter={assignWaiter}
                    updateNumPeople={updateNumPeople}
                />
            ))}
        </div>
    );
}

export default TableList;