// app.js

function reduceNumber(num, allowMaster = false) {
    while (num > 9) {
        // Giữ lại các số Master
        if (allowMaster && [11, 22, 33].includes(num)) {
            return num;
        }

        num = num
            .toString()
            .split("")
            .reduce((sum, digit) => sum + Number(digit), 0);
    }

    return num;
}

function calculateLifePath(dob) {
    const [year, month, day] = dob.split("-").map(Number);

    // Rút gọn từng phần
    const reducedDay = reduceNumber(day, true);
    const reducedMonth = reduceNumber(month, true);
    const reducedYear = reduceNumber(year, true);

    // Tổng ban đầu
    const total = reducedDay + reducedMonth + reducedYear;

    // Kết quả cuối
    const lifePath = reduceNumber(total, true);

    return {
        day: reducedDay,
        month: reducedMonth,
        year: reducedYear,
        total: total,
        lifePath: lifePath
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
            <div class="bg-white border rounded-xl p-6 shadow mt-4">
                <h2 class="text-2xl font-bold text-center mb-4">
                    🔮 Kết quả Nhân Số Học
                </h2>

                <p><strong>Họ tên:</strong> ${name}</p>
                <p><strong>Ngày sinh:</strong> ${formatDate(dob)}</p>

                <hr class="my-4">

                <p>Ngày: <strong>${result.day}</strong></p>
                <p>Tháng: <strong>${result.month}</strong></p>
                <p>Năm: <strong>${result.year}</strong></p>

                <hr class="my-4">

                <p class="text-xl">
                    Con số chủ đạo:
                    <span class="font-bold text-blue-600">
                        ${result.total}/${result.lifePath}
                    </span>
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

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}
