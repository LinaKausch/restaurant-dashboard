import React, { useState } from "react";
import TableList from "./components/TableList";
import Menu from "./components/Menu";

function App() {
  const [tables, setTables] = useState([
    { number: 1, waiter: "", numPeople: 0, orders: {} },
    { number: 2, waiter: "", numPeople: 0, orders: {} },
    { number: 3, waiter: "", numPeople: 0, orders: {} },
  ]);

  const [orderingTable, setOrderingTable] = useState(null);

  return (
    <div>
      <h1>Restaurant Dashboard</h1>
      <TableList tables={tables} setTables={setTables} setOrderingTable={setOrderingTable} />
      {orderingTable !== null && (
        <Menu orderingTable={orderingTable} tables ={tables} setTables ={setTables}/>
      )}
    </div>
  );
}

export default App;
