
async function checkHealth() {
    console.log("--- System Health Check ---");
    const endpoints = [
        { name: 'Finance', url: 'http://127.0.0.1:3000/finance' },
        { name: 'Projects', url: 'http://127.0.0.1:3000/projects' },
        { name: 'Workers', url: 'http://127.0.0.1:3000/workers' },
        { name: 'Suppliers', url: 'http://127.0.0.1:3000/suppliers' },
        { name: 'Customers', url: 'http://127.0.0.1:3000/customers' }
    ];

    let allHealthy = true;

    for (const ep of endpoints) {
        try {
            const start = performance.now();
            const res = await fetch(ep.url);
            const duration = (performance.now() - start).toFixed(2);

            if (res.ok) {
                const data = await res.json();
                console.log(`[PASS] ${ep.name}: ${res.status} OK (${duration}ms) - Records: ${data.length}`);

                if (ep.name === 'Finance') {
                    // Deep check for paid status
                    const paid = data.filter(t => t.status === 'PAID');
                    console.log(`       Paid Transactions: ${paid.length}`);
                }
            } else {
                console.error(`[FAIL] ${ep.name}: ${res.status} ${res.statusText}`);
                allHealthy = false;
            }
        } catch (error) {
            console.error(`[FAIL] ${ep.name}: Network Error`, error.message);
            allHealthy = false;
        }
    }

    if (allHealthy) {
        console.log("\n>>> System is OPERATIONAL <<<");
    } else {
        console.log("\n>>> System has ISSUES <<<");
    }
}

checkHealth();
