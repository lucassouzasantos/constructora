
async function testCreateProject() {
    const payload = {
        name: "Obra Teste Automatizado " + Date.now(),
        city: "Cidade Teste",
        location: "https://maps.google.com",
        totalArea: 150.5,
        salesValue: 750000,
        startDate: "2024-03-01",
        endDate: "2024-12-31"
    };

    console.log("SENDING PAYLOAD:", payload);

    try {
        const response = await fetch('http://localhost:3000/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log("STATUS:", response.status);

        const data = await response.json();
        console.log("RESPONSE:", data);

        if (response.ok) {
            console.log("✅ SUCCESSO: Obra criada corretamente!");
        } else {
            console.error("❌ ERRO: Falha ao criar obra.");
        }
    } catch (error) {
        console.error("❌ ERRO DE REDE:", error.message);
    }
}

testCreateProject();
