// app.js
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
        await saveToGoogleSheet(name, dob);

        // Tính các chỉ số
        const lifePath = calculateLifePath(dob);
        const soulUrge = calculateSoulUrge(name);
        const expression = calculateExpression(name);
        const birthday = calculateBirthdayNumber(dob);

        // Ý nghĩa con số chủ đạo
        const lifePathMeaning = getLifePathMeaning(lifePath.final);

        // Hiển thị kết quả
        document.getElementById("result").innerHTML = renderNumerologyResult({
            name,
            dob,
            lifePath,
            soulUrge,
            expression,
            birthday,
            lifePathMeaning
        });

    } catch (error) {
        console.error(error);

        document.getElementById("result").innerHTML = `
            <div class="p-4 bg-red-100 text-red-700 rounded-xl shadow">
                ❌ Có lỗi xảy ra khi xử lý dữ liệu.
            </div>
        `;
    } finally {
        document.getElementById("loading").classList.add("hidden");
    }
}

// ======================
// Render giao diện kết quả
// ======================
function renderNumerologyResult(data) {
    const formattedName = formatName(data.name);

    return `
        <div class="bg-white rounded-2xl shadow-xl p-6 mt-6 border border-purple-100">
            <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
                🔮 Kết Quả Nhân Số Học
            </h2>

            ${renderUserInfo(formattedName, data.dob)}

            ${renderMainNumber(data.lifePath, data.lifePathMeaning)}

            ${renderOtherNumbers(data)}

            ${renderMeaning(data.lifePathMeaning)}
        </div>
    `;
}

// ======================
// Thông tin người dùng
// ======================
function renderUserInfo(name, dob) {
    return `
        <div class="space-y-2 mb-6">
            <p><strong>Họ tên:</strong> ${name}</p>
            <p><strong>Ngày sinh:</strong> ${formatDate(dob)}</p>
        </div>
    `;
}

// ======================
// Con số chủ đạo
// ======================
function renderMainNumber(lifePath, meaning) {
    return `
        <div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-6 text-center mb-6">
            <h3 class="text-xl font-semibold mb-2">
                Con Số Chủ Đạo
            </h3>
            <p class="text-5xl font-bold">
                ${meaning.title}
            </p>
        </div>
    `;
}

// ======================
// Các con số khác
// ======================
function renderOtherNumbers(data) {
    const numbers = [
        { title: "Linh Hồn", value: data.soulUrge.final },
        { title: "Biểu Đạt", value: data.expression.final },
        { title: "Ngày Sinh", value: data.birthday.final }
    ];

    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            ${numbers.map(item => `
                <div class="bg-gray-50 rounded-xl p-4 text-center border">
                    <h4 class="text-gray-600 font-medium mb-2">
                        ${item.title}
                    </h4>
                    <p class="text-3xl font-bold text-purple-600">
                        ${item.value}
                    </p>
                </div>
            `).join('')}
        </div>
    `;
}

// ======================
// Ý nghĩa
// ======================
function renderMeaning(meaning) {
    return `
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
            <h3 class="text-xl font-bold mb-3 text-yellow-700">
                ✨ Ý Nghĩa Con Số Chủ Đạo
            </h3>
            <p class="text-gray-700 leading-relaxed">
                ${meaning.meaning}
            </p>
        </div>
    `;
}

// ======================
// Viết hoa tên
// ======================
function formatName(name) {
    return name
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
}
