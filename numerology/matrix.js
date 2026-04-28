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
