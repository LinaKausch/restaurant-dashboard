import React from "react";
// import "./Modal.css"; // optional: reuse styles from App.css

function Payment({
    table,
    menuItems,
    onCancel,
    onConfirm,
    isProcessing
}) {
    const total = Object.entries(table.orders).reduce((sum, [name, qty]) => {
        const item = menuItems.find(m => m.name === name);
        return item ? sum + item.price * qty : sum;
    }, 0);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Bill</h2>
                <p className="">Order Summary:</p>
                <ul className="bill-list">
                    <li className="bill-row header">
                        <span>Item</span>
                        <span>Unit</span>
                        <span>Qty</span>
                        <span>Total</span>
                    </li>
                    {Object.entries(table.orders).map(([itemName, qty]) => {
                        const item = menuItems.find(i => i.name === itemName);
                        if (!item) return null;
                        return (
                            <li key={itemName} className="bill-row">
                                <span>{item.name}</span>
                                <span>€{item.price}</span>
                                <span>{qty}</span>
                                <span>€{item.price * qty}</span>
                            </li>
                        );
                    })}
                </ul>

                <p className="bill-total"><strong>Total:</strong> €{total}</p>

                {isProcessing ? (
                    <p>Processing payment...</p>
                ) : (
                    <>
                        <p>Select Payment Method:</p>
                        <div>
                            <div className="pay-type">
                                <button onClick={() => onConfirm("Card")}>Card</button>
                                <button onClick={() => onConfirm("Cash")}>Cash</button>
                            </div>
                            <button className="bill-cancel" onClick={onCancel}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Payment;
