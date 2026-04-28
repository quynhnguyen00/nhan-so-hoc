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

// ======================
// Ý nghĩa con số linh hồn
// ======================
const soulUrgeMeanings = {
    1: { meaning: "Khát khao dẫn đầu, độc lập và tự chủ." },
    2: { meaning: "Mong muốn hòa hợp, yêu thương và kết nối." },
    3: { meaning: "Khát khao sáng tạo, giao tiếp và truyền cảm hứng." },
    4: { meaning: "Mong muốn ổn định, an toàn và xây dựng nền tảng." },
    5: { meaning: "Khao khát tự do, trải nghiệm và khám phá." },
    6: { meaning: "Mong muốn yêu thương, chăm sóc và cống hiến." },
    7: { meaning: "Khát khao tri thức, sự thật và chiều sâu nội tâm." },
    8: { meaning: "Mong muốn thành công, quyền lực và thành tựu." },
    9: { meaning: "Khát khao phụng sự, giúp đỡ và lan tỏa giá trị." },
    11: { meaning: "Trực giác mạnh, sứ mệnh truyền cảm hứng." },
    22: { meaning: "Khát vọng xây dựng những điều lớn lao." },
    33: { meaning: "Tình yêu vô điều kiện và khả năng chữa lành." }
};

// ======================
// Hàm lấy ý nghĩa
// ======================
function getSoulUrgeMeaning(number) {
    return soulUrgeMeanings[number] || {
        meaning: "Chưa có dữ liệu cho con số này."
    };
}

// ======================
// Ý nghĩa con số biểu đạt
// ======================
const expressionMeanings = {
    1: { meaning: "Khả năng lãnh đạo, tiên phong và độc lập." },
    2: { meaning: "Ngoại giao, hợp tác và tinh tế." },
    3: { meaning: "Giao tiếp, sáng tạo và nghệ thuật." },
    4: { meaning: "Kỷ luật, thực tế và đáng tin cậy." },
    5: { meaning: "Linh hoạt, thích nghi và yêu tự do." },
    6: { meaning: "Trách nhiệm, yêu thương và phục vụ." },
    7: { meaning: "Phân tích, nghiên cứu và nội tâm." },
    8: { meaning: "Quản lý, tài chính và thành công." },
    9: { meaning: "Nhân ái, bao dung và lý tưởng." },
    11: { meaning: "Truyền cảm hứng và trực giác cao." },
    22: { meaning: "Kiến tạo và hiện thực hóa mục tiêu lớn." },
    33: { meaning: "Chữa lành, phụng sự và giáo dục." }
};

// ======================
// Hàm lấy ý nghĩa
// ======================
function getExpressionMeaning(number) {
    return expressionMeanings[number] || {
        meaning: "Chưa có dữ liệu cho con số này."
    };
}

// ======================
// Ý nghĩa con số ngày sinh
// ======================
const birthdayMeanings = {
    1: { meaning: "Tiên phong, mạnh mẽ và quyết đoán." },
    2: { meaning: "Nhạy cảm, hòa nhã và hợp tác." },
    3: { meaning: "Vui vẻ, sáng tạo và giao tiếp tốt." },
    4: { meaning: "Thực tế, chăm chỉ và kiên định." },
    5: { meaning: "Tự do, linh hoạt và yêu khám phá." },
    6: { meaning: "Yêu thương, trách nhiệm và tận tâm." },
    7: { meaning: "Thông thái, sâu sắc và ham học hỏi." },
    8: { meaning: "Tham vọng, quản lý và thành công." },
    9: { meaning: "Nhân ái, lý tưởng và vị tha." },
    11: { meaning: "Trực giác mạnh và giàu cảm hứng." },
    22: { meaning: "Năng lực xây dựng và tổ chức lớn." },
    33: { meaning: "Yêu thương vô điều kiện và chữa lành." }
};

// ======================
// Hàm lấy ý nghĩa
// ======================
function getBirthdayMeaning(number) {
    return birthdayMeanings[number] || {
        meaning: "Chưa có dữ liệu cho con số này."
    };
}
