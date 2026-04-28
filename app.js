// ======================
// Xử lý nút tính toán
// ======================
async function submitData() {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;
    const resultElement = document.getElementById("result");
    const loadingElement = document.getElementById("loading");

    if (!name || !dob) {
        alert("Vui lòng nhập đầy đủ họ tên và ngày sinh!");
        return;
    }

    loadingElement.classList.remove("hidden");

    try {
        // Lưu dữ liệu
        await saveToGoogleSheet(name, dob);

        // Tính toán các chỉ số
        const lifePath = calculateLifePath(dob);
        const soulUrge = calculateSoulUrge(name);
        const expression = calculateExpression(name);
        const birthday = calculateBirthdayNumber(dob);

        // Lấy ý nghĩa con số chủ đạo
        const lifePathMeaning = getLifePathMeaning(lifePath.final);

        // Hiển thị kết quả
        resultElement.innerHTML = renderNumerologyResult({
            name,
            dob,
            lifePath,
            soulUrge,
            expression,
            birthday,
            lifePathMeaning
        });

    } catch (error) {
        console.error("Lỗi:", error);

        resultElement.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mt-6 shadow">
                ❌ Có lỗi xảy ra khi xử lý dữ liệu. Vui lòng thử lại sau.
            </div>
        `;
    } finally {
        loadingElement.classList.add("hidden");
    }
}

// ======================
// Render toàn bộ kết quả
// ======================
function renderNumerologyResult(data) {
    return `
        <div class="bg-white rounded-2xl shadow-xl p-6 mt-6 border border-purple-100">

            <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
                🔮 Kết Quả Nhân Số Học
            </h2>

            ${renderUserInfo(data.name, data.dob)}

            ${renderMainNumber(data.lifePathMeaning)}

            ${renderOtherNumbers(data)}

            ${renderMeaning(data.lifePathMeaning)}

        </div>
    `;
}

// ======================
// Thông tin cá nhân
// ======================
function renderUserInfo(name, dob) {
    return `
        <div class="space-y-2 mb-6 text-gray-700">
            <p>
                <strong>Họ tên:</strong>
                ${formatName(name)}
            </p>
            <p>
                <strong>Ngày sinh:</strong>
                ${formatDate(dob)}
            </p>
        </div>
    `;
}

// ======================
// Con số chủ đạo
// ======================
function renderMainNumber(meaning) {
    return `
        <div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-6 text-center mb-6 shadow-lg">
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
    const cards = [
        {
            title: "Linh Hồn",
            value: data.soulUrge.final
        },
        {
            title: "Biểu Đạt",
            value: data.expression.final
        },
        {
            title: "Ngày Sinh",
            value: data.birthday.final
        }
    ];

    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            ${cards.map(card => `
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition">
                    <h4 class="text-gray-600 font-medium mb-3">
                        ${card.title}
                    </h4>
                    <p class="text-4xl font-bold text-purple-600">
                        ${card.value}
                    </p>
                </div>
            `).join('')}
        </div>
    `;
}

// ======================
// Ý nghĩa con số chủ đạo
// ======================
function renderMeaning(meaning) {
    return `
        <div class="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-5">
            <h3 class="text-xl font-bold text-yellow-700 mb-3">
                ✨ Ý Nghĩa
            </h3>
            <p class="text-gray-700 leading-relaxed">
                ${meaning.meaning}
            </p>
        </div>
    `;
}

// ======================
// Định dạng ngày
// ======================
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

// ======================
// Viết hoa chữ cái đầu
// ======================
function formatName(name) {
    return name
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
}
