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

        document.getElementById("result").innerHTML = `
            <div class="p-4 bg-green-100 text-green-700 rounded">
                ✅ Đã lưu thông tin thành công!
            </div>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = `
            <div class="p-4 bg-red-100 text-red-700 rounded">
                ❌ Có lỗi xảy ra.
            </div>
        `;
    } finally {
        document.getElementById("loading").classList.add("hidden");
    }
}
