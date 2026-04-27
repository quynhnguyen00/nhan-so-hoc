const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxlNm89e8xLmMz1zVevL_lWvoyfLtS8IKuXUeWIMQYTRq5QOS843631r54AvllIy-sChQ/exec";

async function saveToGoogleSheet(name, dob) {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            dob: dob,
            timestamp: new Date().toISOString()
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}
