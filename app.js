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
        const meaning = getLifePathMeaning(result.final);
        
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

// ======================
// Ý nghĩa con số chủ đạo
// ======================
const lifePathMeanings = {
    2: {
        title: "Số 2",
        meaning: "Con số về tâm linh, thích cảm giác bình yên, giàu lòng trắc ẩn."
    },
    3: {
        title: "Số 3",
        meaning: "Con số truyền cảm hứng, có tư duy sáng tạo và khả năng giao tiếp."
    },
    4: {
        title: "Số 4",
        meaning: "Con số thực tế, kỷ luật, tháo vác, khéo tay, thích làm việc sử dụng tay chân."
    },
    5: {
        title: "Số 5",
        meaning: "Con số tự do, yêu thích phiêu lưu, khám phá và không thích sự gò bó luật lệ."
    },
    6: {
        title: "Số 6",
        meaning: "Con số của tình yêu, sáng tạo, giàu tình yêu thương và hướng về gia đình."
    },
    7: {
        title: "Số 7",
        meaning: "Con số của sự trải nghiệm, mất mát, hy sinh, thích tự học hỏi thông qua trải nghiệm của bản thân."
    },
    8: {
        title: "Số 8",
        meaning: "Con số sự độc lập, chủ động, mạnh mẽ, thích đánh giá, có khả năng quản lý và nhìn bao quát vấn đề."
    },
    9: {
        title: "Số 9",
        meaning: "Con số phụng sự nhân sinh, trách nhiệm, hoài bão, nghiêm túc và có xu hướng sống vì người khác."
    },
    10: {
        title: "Số 10",
        meaning: "Con số Masters, có cái tôi cao, thích dẫn đầu, khác biệt và nếu đi đúng hướng sẽ thành công cao."
    },
    11: {
        title: "Số 11/2",
        meaning: "Những linh hồn nhạy cảm, trực giác cực cao và có khả năng dẫn dắt tâm linh."
    },
    22: {
        title: "Số 22/4",
        meaning: "Được gọi là 'Số Vua', có khả năng hiện thực hóa những mục tiêu khổng lồ vì lợi ích nhân loại."
    }
};

// ======================
// Hàm lấy ý nghĩa
// ======================
function getLifePathMeaning(number) {
    return lifePathMeanings[number] || {
        title: `Số ${number}`,
        meaning: "Chưa có dữ liệu cho con số này."
    };
}
