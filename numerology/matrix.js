// ======================
// Tạo ma trận Pythagoras, lấy mũi tên có và mũi tên trống
// ======================
function buildMatrix(dob) {
    const digits = dob.replaceAll("-", "").split("").map(Number);

    let matrix = {
        1:0,2:0,3:0,
        4:0,5:0,6:0,
        7:0,8:0,9:0
    };

    digits.forEach(n => {
        if (matrix[n] !== undefined) {
            matrix[n]++;
        }
    });

    return matrix;
}

// ======================
// Mũi tên logic
// ======================

function calculateArrows(matrix) {

    const arrows = {
        "1-2-3": "Trí tuệ",
        "4-5-6": "Thực tế",
        "7-8-9": "Tâm linh",
        "1-4-7": "Kỷ luật",
        "2-5-8": "Cảm xúc",
        "3-6-9": "Sáng tạo",
        "1-5-9": "Quyết tâm",
        "3-5-7": "Nhạy bén"
    };

    let strong = [];
    let missing = [];

    for (let key in arrows) {
        let nums = key.split("-");

        let ok = nums.every(n => matrix[n] > 0);

        if (ok) {
            strong.push(arrows[key]);
        } else {
            missing.push(arrows[key]);
        }
    }

    return { strong, missing };
}
