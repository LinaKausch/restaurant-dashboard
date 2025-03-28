import React from "react";

function Menu({ orderingTable, tables, setTables }) {
    const menuItems = [
        { id: 1, name: "Steak", price: 20 },
        { id: 2, name: "Pasta", price: 15 },
        { id: 3, name: "Salad", price: 10 },
        { id: 4, name: "Wine", price: 8 },
    ]

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
            )
        );
    };

    const confirmOrder = () => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.number === orderingTable
                    ? {
                        ...table,
                        orderConfirmed: true,  
                    }
                    : table
            )
        );
    };

    const currentTable = tables.find((table) => table.number === orderingTable);

    return (
        <div>
            <h2>Menu</h2>
            <h2>Ordering for Table {orderingTable}</h2>

            <ul>
                {menuItems.map((item) => {
                    const orderCount = currentTable?.orders[item.name] || 0;

                    return (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => addOrder(item.name)}>➕</button>
                            <button onClick={() => removeOrder(item.name)}>➖</button>
                            <span> {orderCount}</span>
                        </li>
                    );
                })}
            </ul>
            <button onClick={confirmOrder}>Order</button>
        </div>
    );
}

export default Menu;