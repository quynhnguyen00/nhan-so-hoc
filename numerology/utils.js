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

// Xóa dấu tiếng Việt
function removeVietnameseTones(str) {
    return str.normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D");
}

// Quy đổi chữ cái Pitago
function getLetterValue(char) {
    const chart = {
        A: 1, J: 1, S: 1,
        B: 2, K: 2, T: 2,
        C: 3, L: 3, U: 3,
        D: 4, M: 4, V: 4,
        E: 5, N: 5, W: 5,
        F: 6, O: 6, X: 6,
        G: 7, P: 7, Y: 7,
        H: 8, Q: 8, Z: 8,
        I: 9, R: 9
    };

    return chart[char.toUpperCase()] || 0;
}
