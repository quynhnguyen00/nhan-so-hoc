// app.js

// ======================
// Hàm rút gọn một số
// ======================
function reduceNumber(number, masterNumbers = [11, 22, 33]) {
    while (number > 9 && !masterNumbers.includes(number)) {
        number = number
            .toString()
            .split('')
            .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return number;
}

// ======================
// Tính con số chủ đạo
// ======================
function calculateLifePath(dob) {
    const [year, month, day] = dob.split('-').map(Number);

    // Rút gọn ngày (giữ 11)
    const reducedDay = reduceNumber(day, [11]);

    // Rút gọn tháng (1-10)
    const reducedMonth = reduceNumber(month, [10]);

    // Rút gọn năm (giữ 11,22,33)
    const reducedYear = reduceNumber(year, [11, 22, 33]);

    // Tổng cuối cùng
    const total = reducedDay + reducedMonth + reducedYear;
    const finalNumber = reduceNumber(total, [11, 22, 33]);

    return {
        day: reducedDay,
        month: reducedMonth,
        year: reducedYear,
        total: total,
        final: finalNumber
    };
}

// ======================
// Xử lý nút tính toán
// ======================
async function submitData() {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;

    if (!name || !dob) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");

    try {
        // Lưu Google Sheet
        await saveToGoogleSheet(name, dob);

        // Tính thần số học
        const result = calculateLifePath(dob);

        document.getElementById("result").innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6 mt-5 border">
                <h2 class="text-2xl font-bold text-center text-purple-600 mb-4">
                    🔮 Kết Quả Nhân Số Học
                </h2>

                <p class="mb-2"><strong>Họ tên:</strong> ${name}</p>
                <p class="mb-2"><strong>Ngày sinh:</strong> ${formatDate(dob)}</p>

                <hr class="my-4">

                <p>Ngày: ${result.day}</p>
                <p>Tháng: ${result.month}</p>
                <p>Năm: ${result.year}</p>

                <hr class="my-4">

                <p class="text-xl font-bold text-center text-blue-600">
                    Con số chủ đạo: ${result.total}/${result.final}
                </p>
            </div>
        `;
    } catch (error) {
        console.error(error);

        document.getElementById("result").innerHTML = `
            <div class="p-4 bg-red-100 text-red-700 rounded">
                ❌ Có lỗi xảy ra khi xử lý dữ liệu.
            </div>
        `;
    } finally {
        document.getElementById("loading").classList.add("hidden");
    }
}

// ======================
// Định dạng ngày
// ======================
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
