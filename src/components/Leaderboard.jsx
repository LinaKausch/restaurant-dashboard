import React from "react";

const Leaderboard = ({ waitersStats }) => {
    const waiterImages = {
        Alice: "https://i.pravatar.cc/150?img=1",
        Bob: "https://i.pravatar.cc/150?img=2",
        Charlie: "https://i.pravatar.cc/150?img=3",
        Diana: "https://i.pravatar.cc/150?img=4",
        Ethan: "https://i.pravatar.cc/150?img=5",
    };

    const sorted = Object.entries(waitersStats).sort((a, b) => b[1].totalRevenue - a[1].totalRevenue);

    const getTopWaiter = (statKey) => {
        let top = null;

        for (const [name, stats] of Object.entries(waitersStats)) {
            if (!top || stats[statKey] > top.value) {
                top = { name, value: stats[statKey] };
            }
        }

        return top;
    };

    const topRevenue = getTopWaiter("totalRevenue");
    const topGuests = getTopWaiter("guestsServed");
    const topTables = getTopWaiter("tablesServed");
    const topBill = getTopWaiter("mostExpensiveTable");


    return (
        <div>
            <h2>Leaderboard</h2>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "2rem" }}>
                <div>
                    <h3>💰 The Money Machine</h3>
                    {topRevenue ? (
                        <>
                            <img
                                src={waiterImages[topRevenue.name]}
                                alt={topRevenue.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topRevenue.name} — ${topRevenue.value}</p>

                            <p>{topBill.name} — ${topBill.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
                <div>
                    <h3>👥 The People Person</h3>
                    {topGuests ? (
                        <>
                            <img
                                src={waiterImages[topRevenue.name]}
                                alt={topRevenue.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topRevenue.name} — ${topRevenue.value}</p>

                            <p>{topBill.name} — ${topBill.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
                <div>
                    <h3>🍽️ The Table Titan</h3>
                    {topTables ? (
                        <>
                            <img
                                src={waiterImages[topRevenue.name]}
                                alt={topRevenue.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topRevenue.name} — ${topRevenue.value}</p>

                            <p>{topBill.name} — ${topBill.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
                <div>
                    <h3>💎 The Big Spender</h3>
                    {topBill ? (
                        <>
                            <img
                                src={waiterImages[topRevenue.name]}
                                alt={topRevenue.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topRevenue.name} — ${topRevenue.value}</p>

                            <p>{topBill.name} — ${topBill.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Waiter</th>
                        <th>💰 Revenue</th>
                        <th>👥 Guests</th>
                        <th>🍽️ Tables</th>
                        <th>💎 Biggest Bill</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map(([name, stats]) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>${stats.totalRevenue}</td>
                            <td>{stats.guestsServed}</td>
                            <td>{stats.tablesServed}</td>
                            <td>${stats.mostExpensiveTable}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
