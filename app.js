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
        // Lưu Google Sheet
        await saveToGoogleSheet(name, dob);

        // Tính thần số học
        const result = calculateLifePath(dob);

		// Tính con số chủ đạo, linh hồn, biểu đạt, ngày sinh
		const lifePath = calculateLifePath(dob);
		const soulUrge = calculateSoulUrge(name);
		const expression = calculateExpression(name);
		const birthday = calculateBirthdayNumber(dob);
		// Ý nghĩa từng con số
        const meaning = getLifePathMeaning(result.final);
        
		document.getElementById("result").innerHTML = `
			<div class="bg-white rounded-2xl shadow-xl p-6 mt-6 border border-purple-100">
				<h2 class="text-3xl font-bold text-center text-purple-600 mb-6">
					🔮 Kết Quả Nhân Số Học
				</h2>

				<div class="space-y-2 mb-6">
					<p><strong>Họ tên:</strong> ${name
					  .toLowerCase()
					  .replace(/\b\w/g, char => char.toUpperCase())}</p>
					<p><strong>Ngày sinh:</strong> ${formatDate(dob)}</p>
				</div>

				<div class="bg-gray-50 rounded-xl p-4 mb-6">
					<h3 class="font-bold text-lg mb-3">📌 Quá trình tính toán</h3>
					<p>Ngày: ${result.day}</p>
					<p>Tháng: ${result.month}</p>
					<p>Năm: ${result.year}</p>
					<p class="mt-3 font-semibold">
						Tổng: ${result.total}
					</p>
				</div>

				<div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-6 text-center mb-6">
					<h3 class="text-xl font-semibold mb-2">
						Con Số Chủ Đạo
					</h3>
					<p class="text-5xl font-bold">
						${meaning.title}
					</p>
				</div>

				<div class="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
					<h3 class="text-xl font-bold mb-3 text-yellow-700">
						✨ Ý Nghĩa
					</h3>
					<p class="text-gray-700 leading-relaxed">
						${meaning.meaning}
					</p>
				</div>
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
