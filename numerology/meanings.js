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
// Đọc hàm ý nghĩa con số
// ======================
function getLifePathMeaning(number) {
    return lifePathMeanings[number] || {
        title: `Số ${number}`,
        meaning: "Chưa có dữ liệu cho con số này."
    };
}
