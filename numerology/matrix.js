// ======================
// Tạo ma trận Pythagoras, lấy mũi tên có và mũi tên trống
// ======================
function buildMatrix(digits) {
    let matrix = {
        1:0,2:0,3:0,
        4:0,5:0,6:0,
        7:0,8:0,9:0
    };

    digits.forEach(d => {
        if(matrix[d] !== undefined) {
            matrix[d]++;
        }
    });

    return matrix;
}

function getArrows(matrix) {

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

    let result = {
        strong: [],
        missing: []
    };

    for(let key in arrows) {
        let nums = key.split("-");
        let hasAll = nums.every(n => matrix[n] > 0);

        if(hasAll) {
            result.strong.push(arrows[key]);
        } else {
            result.missing.push(arrows[key]);
        }
    }

    return result;
}
