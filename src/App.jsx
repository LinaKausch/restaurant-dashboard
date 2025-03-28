import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TableList from "./components/TableList";
import Order from "./components/Order";

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

  const openOrder = (tableNumber) => setOrderingTable(tableNumber);
  const closeOrder = () => setOrderingTable(null);

  return (
    <Router basename="/restaurant-dashboard">
      <nav>
        <ul>
          <li><Link to="/">Table List</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
      </nav>

      <div>
        <h1>Restaurant Dashboard</h1>
        <Routes>
          <Route
            path="/"
            element={
              <TableList
                tables={tables}
                setTables={setTables}
                setOrderingTable={setOrderingTable}
                menuItems={menuItems}
                openOrder={openOrder}
              />
            }
          />
          <Route
            path="/menu"
            element={<h2>Menu Page (Coming Soon)</h2>}
          />
        </Routes>
        {orderingTable !== null && (
          <Order orderingTable={orderingTable} tables={tables} setTables={setTables} menuItems={menuItems} closeOrder = {closeOrder}/>
        )}
      </div>
    </Router>
  );
}

export default App;
