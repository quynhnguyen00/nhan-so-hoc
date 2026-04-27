async function submitData() {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;

    if (!name || !dob) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");

    // Lưu log vào Google Sheet
    saveToGoogleSheet(name, dob);

    // Phần xử lý nhân số học của bạn
    // ...

    document.getElementById("loading").classList.add("hidden");
}