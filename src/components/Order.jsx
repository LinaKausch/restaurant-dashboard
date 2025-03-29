import React from "react";

function Order({ orderingTable, tables, setTables, menuItems }) {


    const addOrder = (item) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.number === orderingTable
                    ? {
                        ...table,
                        orders: {
                            ...table.orders,
                            [item]: (table.orders[item] || 0) + 1,
                        }
                    }
                    : table
            )
        );
    };

    const removeOrder = (item) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.number === orderingTable
                    ? {
                        ...table,
                        orders: {
                            ...table.orders,
                            [item]: table.orders[item] > 1 ? table.orders[item] - 1 : undefined
                        }
                    }
                    : table
            ).map((table) => {

                if (table.number === orderingTable) {
                    const newOrders = { ...table.orders };
                    if (newOrders[item] === undefined) {
                        delete newOrders[item];
                    }
                    return {
                        ...table,
                        orders: newOrders,
                    };
                }
                return table;
            })
        );
    };

    const currentTable = tables.find((table) => table.number === orderingTable);

    return (
        <div>
            <h2>Menu</h2>
            <h2>Ordering for Table {orderingTable}</h2>

            <ul>
                {menuItems
                .filter(item => item.available)
                .map((item) => {
                    const orderCount = currentTable?.orders[item.name] || 0;

                    return (
                        <li key={item.id}>
                            {item.name} - €{item.price}
                            <button onClick={() => addOrder(item.name)}>➕</button>
                            <button onClick={() => removeOrder(item.name)}>➖</button>
                            <span> {orderCount}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Order;