// ======================
// Tính con số biểu đạt
// ======================
function calculateExpression(name) {
    const cleanName = removeVietnameseTones(name)
        .toUpperCase()
        .replace(/[^A-Z]/g, '');

    let total = 0;

    for (const char of cleanName) {
        total += getLetterValue(char);
    }

    return {
        total,
        final: reduceNumber(total, [11, 22, 33])
    };
}
