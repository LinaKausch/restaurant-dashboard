import React from "react";

const Leaderboard = ({ waitersStats }) => {
    const waiterImages = {
        Alice: "https://i.pravatar.cc/150?img=49",
        Bob: "https://i.pravatar.cc/150?img=59",
        Charlie: "https://i.pravatar.cc/150?img=12",
        Diana: "https://i.pravatar.cc/150?img=45",
        Ethan: "https://i.pravatar.cc/150?img=53",
    };

    const getTopWaiter = (statKey) => {
        let top = null;

        for (const name in waitersStats) {
            const stats = waitersStats[name];
            if (!top || stats[statKey] > top.value) {
                top = { name: name, value: stats[statKey] };
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
            <h2 className="leaderboard-title">Leaderboard</h2>
            <p className="leaderboard-note">Stats appear after a waiter has completed at least one paid table. </p>
            <div className="fame-grid">
                <div>
                    <h3>The Cash Collector</h3>
                    {topRevenue ? (
                        <>
                            <img
                                src={waiterImages[topRevenue.name]}
                                alt={topRevenue.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topRevenue.name} — ${topRevenue.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
                <div>
                    <h3>The Social Ninja</h3>
                    {topGuests ? (
                        <>
                            <img
                                src={waiterImages[topGuests.name]}
                                alt={topGuests.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topGuests.name} — {topGuests.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
                <div>
                    <h3>The Table Wizard</h3>
                    {topTables ? (
                        <>
                            <img
                                src={waiterImages[topTables.name]}
                                alt={topTables.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topTables.name} — {topTables.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
                <div>
                    <h3>The Menu Whisperer</h3>
                    {topBill ? (
                        <>
                            <img
                                src={waiterImages[topBill.name]}
                                alt={topBill.name}
                                style={{ width: "80px", borderRadius: "50%", marginBottom: "0.5rem" }}
                            />
                            <p>{topBill.name} — ${topBill.value}</p>
                        </>
                    ) : <p>–</p>}
                </div>
            </div>

            <table className="leaderboard-table">

                <thead>
                    <tr>
                        <th>Waiter</th>
                        <th>Total bill</th>
                        <th>Guests served</th>
                        <th>Tables served</th>
                        <th>Biggest Bill</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(waitersStats).map(([name, stats]) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>€{stats.totalRevenue}</td>
                            <td>{stats.guestsServed}</td>
                            <td>{stats.tablesServed}</td>
                            <td>€{stats.mostExpensiveTable}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
