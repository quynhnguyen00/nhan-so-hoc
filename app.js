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
        <div class="bg-white rounded-3xl shadow-2xl p-6 mt-6 border border-purple-100">

            <h2 class="text-3xl font-bold text-center text-purple-600 mb-8">
                🔮 Kết Quả Nhân Số Học
            </h2>

            ${renderUserInfo(data.name, data.dob)}

            ${renderNumbersGrid(data)}

        </div>
    `;
}

// ======================
// Bảng 2x2 các con số
// ======================
function renderNumbersGrid(data) {
    const cards = [
        {
            title: "Con Số Chủ Đạo",
            number: data.lifePath.final,
            meaning: getLifePathMeaning(data.lifePath.final).meaning,
            gradient: "from-purple-500 to-blue-500"
        },
        {
            title: "Con Số Linh Hồn",
            number: data.soulUrge.final,
            meaning: getSoulUrgeMeaning(data.soulUrge.final).meaning,
            gradient: "from-pink-500 to-rose-500"
        },
        {
            title: "Con Số Biểu Đạt",
            number: data.expression.final,
            meaning: getExpressionMeaning(data.expression.final).meaning,
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "Con Số Ngày Sinh",
            number: data.birthday.final,
            meaning: getBirthdayMeaning(data.birthday.final).meaning,
            gradient: "from-orange-500 to-amber-500"
        }
    ];

    return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${cards.map(card => `
                <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300">
                    
                    <div class="bg-gradient-to-r ${card.gradient} text-white p-5 text-center">
                        <h3 class="text-xl font-bold mb-2">
                            ${card.title}
                        </h3>
                        <div class="text-5xl font-extrabold">
                            ${card.number}
                        </div>
                    </div>

                    <div class="bg-white p-5">
                        <p class="text-gray-700 leading-relaxed text-justify">
                            ${card.meaning}
                        </p>
                    </div>

                </div>
            `).join('')}
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
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(' ');
}
