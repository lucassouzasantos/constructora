async function check() {
    try {
        const res = await fetch('http://localhost:3000/finance');
        const data = await res.json();
        const recent = data.slice(0, 5); // last 5
        console.log("Recent Transactions:", JSON.stringify(recent, null, 2));

        // Check for anomalies
        const paidExpenses = data.filter(t => t.type === 'EXPENSE' && t.status === 'PAID');
        console.log(`Paid Expenses Count: ${paidExpenses.length}`);

        if (paidExpenses.length > 0) {
            console.log("Sample Paid Expense:", JSON.stringify(paidExpenses[0], null, 2));
        }

    } catch (e) {
        console.error(e);
    }
}

check();
