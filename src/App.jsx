import React, { useState } from "react";
import TableList from "./components/TableList";

function App() {
  const [tables, setTables] = useState([
    { number: 1, waiter: "", numPeople: 0 },
    { number: 2, waiter: "", numPeople: 0 },
    { number: 3, waiter: "", numPeople: 0 },
  ]);

  return (
    <div>
      <h1>Restaurant Dashboard</h1>
      <p>Hello</p>
      <TableList tables={tables} setTables={setTables} />
    </div>
  );
}

export default App;
