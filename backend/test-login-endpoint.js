
async function testLogin() {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@admin.com', password: 'admin' }),
        });

        console.log('Status:', response.status);
        if (!response.ok) {
            console.log('Error Text:', await response.text());
        } else {
            const data = await response.json();
            console.log('Token received:', data.access_token ? 'YES' : 'NO');
            console.log('User received:', data.user ? 'YES' : 'NO');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testLogin();
