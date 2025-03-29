import React from "react";
import Table from "./Table";

function TableList({ tables, setTables, setOrderingTable, menuItems, openOrder, handlePay, updateNumPeople, waiters, setPayingTable, clearTable}) {

  const assignWaiter = (name, tableNumber) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.number === tableNumber
          ? { ...table, waiter: name }
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
          waiters={waiters}
          assignWaiter={assignWaiter}
          updateNumPeople={updateNumPeople}
          setOrderingTable={setOrderingTable}
          menuItems={menuItems}
          onOrderClick={() => openOrder(table.number)}
          openOrder={openOrder}
          handlePay={handlePay}
          setPayingTable={setPayingTable}
          clearTable={clearTable}
        />
      ))}
    </div>
  );
}

export default TableList;