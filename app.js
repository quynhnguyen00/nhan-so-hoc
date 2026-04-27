// app.js

// Rút gọn về 1-9
function reduceSingleDigit(number) {
    while (number > 9) {
        number = number
            .toString()
            .split("")
            .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return number;
}

// Rút gọn nhưng giữ lại 11, 22, 33
function reduceMasterNumber(number) {
    while (number > 9 && ![11, 22, 33].includes(number)) {
        number = number
            .toString()
            .split("")
            .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return number;
}

// Tính con số chủ đạo
function calculateLifePath(dob) {
    const [year, month, day] = dob.split("-").map(Number);

    const reducedDay = reduceSingleDigit(day);
    const reducedMonth = reduceSingleDigit(month);
    const reducedYear = reduceMasterNumber(year);

    const total = reducedDay + reducedMonth + reducedYear;
    const finalNumber = reduceMasterNumber(total);

    return {
        day: reducedDay,
        month: reducedMonth,
        year: reducedYear,
        total: total,
        lifePath: finalNumber
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
        // Tính con số chủ đạo
        const result = calculateLifePath(dob);

        // Lưu Google Sheet
        await saveToGoogleSheet(name, dob);

        // Hiển thị kết quả
        document.getElementById("result").innerHTML = `
            <div class="p-6 bg-white rounded-2xl shadow mt-4">
                <h2 class="text-2xl font-bold text-center text-purple-600 mb-4">
                    🔮 Kết Quả Nhân Số Học
                </h2>

                <p class="mb-2"><strong>Họ tên:</strong> ${name}</p>
                <p class="mb-2"><strong>Ngày sinh:</strong> ${formatDate(dob)}</p>

                <hr class="my-4">

                <p>Ngày: ${result.day}</p>
                <p>Tháng: ${result.month}</p>
                <p>Năm: ${result.year}</p>

                <p class="mt-4 text-xl font-bold text-blue-600">
                    Con số chủ đạo: ${result.lifePath}
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

// Định dạng ngày dd/mm/yyyy
function formatDate(dob) {
    const [year, month, day] = dob.split("-");
    return `${day}/${month}/${year}`;
}
