const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxlNm89e8xLmMz1zVevL_lWvoyfLtS8IKuXUeWIMQYTRq5QOS843631r54AvllIy-sChQ/exec";

async function saveToGoogleSheet(name, dob) {
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                dob: dob,
                timestamp: new Date().toLocaleString("vi-VN")
            })
        });

        console.log("Đã lưu dữ liệu vào Google Sheet");
    } catch (error) {
        console.error("Lỗi lưu Google Sheet:", error);
    }
}