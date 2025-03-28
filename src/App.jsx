import React, { useState } from "react";
import TableList from "./components/TableList";
import Menu from "./components/Menu";

function App() {
  const [tables, setTables] = useState([
    { number: 1, waiter: "", numPeople: 0, orders: {} },
    { number: 2, waiter: "", numPeople: 0, orders: {} },
    { number: 3, waiter: "", numPeople: 0, orders: {} },
  ]);

  const menuItems = [
    { id: 1, name: "Steak", price: 20 },
    { id: 2, name: "Pasta", price: 15 },
    { id: 3, name: "Salad", price: 10 },
    { id: 4, name: "Wine", price: 8 },
  ];

  const [orderingTable, setOrderingTable] = useState(null);

  return (
    <div>
      <h1>Restaurant Dashboard</h1>
      <TableList tables={tables} setTables={setTables} setOrderingTable={setOrderingTable} menuItems={menuItems} />
      {orderingTable !== null && (
        <Menu orderingTable={orderingTable} tables ={tables} setTables ={setTables} menuItems = {menuItems}/>
      )}
    </div>
  );
}

export default App;
