async function submitData() {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;

    if (!name || !dob) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");

    // Lưu log vào Google Sheet
    //saveToGoogleSheet(name, dob);

    // Phần xử lý nhân số học của bạn
    // ...
    try {
        await saveToGoogleSheet(name, dob);
        console.log("Lưu Google Sheet thành công");

        document.getElementById("result").innerHTML = `
            <div class="p-4 bg-green-100 rounded">
                ✅ Đã nhận thông tin của ${name}
            </div>
        `;
    } catch (error) {
        console.error("Lỗi:", error);

        document.getElementById("result").innerHTML = `
            <div class="p-4 bg-red-100 rounded">
                ❌ ${error.message}
            </div>
        `;
    } finally {
        document.getElementById("loading").classList.add("hidden");
    }
}
