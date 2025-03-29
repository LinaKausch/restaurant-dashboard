import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TableList from "./components/TableList";
import Order from "./components/Order";
import Menu from "./components/Menu";
import Leaderboard from "./components/Leaderboard";
import "./App.css";


function App() {
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('tables');
    const initialValue = JSON.parse(saved);
    return initialValue || [
      { number: 1, waiter: "", numPeople: 0, orders: {} },
      { number: 2, waiter: "", numPeople: 0, orders: {} },
      { number: 3, waiter: "", numPeople: 0, orders: {} },
    ];
  });

  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menuItems');
    const initialValue = JSON.parse(saved);
    return initialValue || [
      { id: 1, name: "Steak", price: 20, available: true },
      { id: 2, name: "Pasta", price: 15, available: true },
      { id: 3, name: "Salad", price: 10, available: false },
      { id: 5, name: "Soup", price: 7, available: false },
      { id: 10, name: "Ice Cream", price: 6, available: true },
      { id: 4, name: "Wine", price: 8, available: true },
      { id: 14, name: "Coffee", price: 2, available: true },
    ];
  });

  const [waitersStats, setWaitersStats] = useState(() =>{
    const saved = localStorage.getItem("waitersStats");
    if (!saved || saved === "undefined") return {};
    return JSON.parse(saved);
  });

  const waiters = ["Alice", "Bob", "Charlie", "Diana", "Ethan"];


  const [orderingTable, setOrderingTable] = useState(null);

  const openOrder = (tableNumber) => setOrderingTable(tableNumber);
  const closeOrder = () => setOrderingTable(null);

  const updateNumPeople = (tableNumber, value) => {
    setTables(prev =>
      prev.map(table =>
        table.number === tableNumber
          ? { ...table, numPeople: parseInt(value) || 0 }
          : table
      )
    );
  };

  const handlePay = (tableNumber) => {
    const table = tables.find(t => t.number === tableNumber);
    const waiter = table.waiter;
    const guests = table.numPeople;
    const orders = table.orders;

    const totalBill = Object.entries(orders).reduce((total, [name, qty]) => {
      const item = menuItems.find(m => m.name === name);
      return item ? total + item.price * qty : total;
    }, 0);

    setWaitersStats(prev => {
      const current = prev[waiter] || {
        totalRevenue: 0,
        guestsServed: 0,
        tablesServed: 0,
        mostExpensiveTable: 0,
      };

      const updated = {
        totalRevenue: current.totalRevenue + totalBill,
        guestsServed: current.guestsServed + guests,
        tablesServed: current.tablesServed + 1,
        mostExpensiveTable: Math.max(current.mostExpensiveTable, totalBill),
      };

      return {
        ...prev,
        [waiter]: updated,
      };
    });

    console.log(waitersStats);

    setTables(prev =>
      prev.map(table =>
        table.number === tableNumber
          ? { ...table, numPeople: 0, orders: {} }
          : table
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem("waitersStats", JSON.stringify(waitersStats));
  }, [waitersStats]);



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
                waiters={waiters}
                setTables={setTables}
                menuItems={menuItems}
                openOrder={openOrder}
                handlePay={handlePay}
                updateNumPeople={updateNumPeople}
              />
            }
          />
          <Route
            path="/menu"
            element={<Menu
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard waitersStats={waitersStats} />}
          />
        </Routes>
        {orderingTable !== null && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={closeOrder}>❌</button>
              <Order
                orderingTable={orderingTable}
                tables={tables}
                setTables={setTables}
                menuItems={menuItems}
              />
            </div>
          </div>
        )}

      </div>
    </Router>
  );
}

export default App;
