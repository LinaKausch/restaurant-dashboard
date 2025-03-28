import React from "react";
import Table from "./Table";

function TableList({ tables, setTables, setOrderingTable }) {

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
          ? { ...table, numPeople } 
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
          setOrderingTable={setOrderingTable}  
        />
      ))}
    </div>
  );
}

export default TableList;