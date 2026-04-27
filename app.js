// app.js

// Hàm cộng các chữ số đến khi còn 1 số
function reduceToSingleDigit(number) {
    while (number > 9) {
        number = number
            .toString()
            .split('')
            .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return number;
}

// Hàm rút gọn năm (giữ lại 11, 22, 33 nếu có)
function reduceYear(number) {
    while (number > 10 && number !== 11 && number !== 22 && number !== 33) {
        number = number
            .toString()
            .split('')
            .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return number;
}

// Hàm tính con số chủ đạo
function calculateLifePath(dob) {
    const [year, month, day] = dob.split('-').map(Number);

    // Rút gọn từng phần
    const reducedDay = reduceToSingleDigit(day);
    const reducedMonth = reduceToSingleDigit(month);
    const reducedYear = reduceYear(year);

    // Tổng ban đầu
    const total = reducedDay + reducedMonth + reducedYear;

    // Rút gọn kết quả cuối
    const finalNumber = reduceToSingleDigit(total);

    return {
        day: reducedDay,
        month: reducedMonth,
        year: reducedYear,
        total: total,
        final: finalNumber
    };
}

async function submitData() {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;

    if (!name || !dob) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");

    try {
        // Lưu dữ liệu vào Google Sheet
        await saveToGoogleSheet(name, dob);

        // Tính con số chủ đạo
        const result = calculateLifePath(dob);

        document.getElementById("result").innerHTML = `
            <div class="p-5 bg-white border rounded-xl shadow">
                <h2 class="text-xl font-bold text-center mb-4">
                    🔮 Kết quả Nhân Số Học
                </h2>

                <p><strong>Họ tên:</strong> ${name}</p>
                <p><strong>Ngày sinh:</strong> ${new Date(dob).toLocaleDateString('vi-VN')}</p>

                <hr class="my-4">

                <p>Ngày: ${result.day}</p>
                <p>Tháng: ${result.month}</p>
                <p>Năm: ${result.year}</p>

                <hr class="my-4">

                <p class="text-lg">
                    Tổng: ${result.total}
                </p>

                <p class="text-2xl font-bold text-blue-600 mt-3 text-center">
                    Con số chủ đạo: ${result.total}/${result.final}
                </p>
            </div>
        `;

    } catch (error) {
        console.error(error);

        document.getElementById("result").innerHTML = `
            <div class="p-4 bg-red-100 text-red-700 rounded">
                ❌ Có lỗi xảy ra: ${error.message}
            </div>
        `;
    } finally {
        document.getElementById("loading").classList.add("hidden");
    }
}
