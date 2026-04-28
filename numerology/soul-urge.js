// ======================
// Tính con số linh hồn
// ======================
function calculateSoulUrge(name) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];

    const cleanName = removeVietnameseTones(name)
        .toUpperCase()
        .replace(/[^A-Z]/g, '');

    let total = 0;

    for (const char of cleanName) {
        if (vowels.includes(char)) {
            total += getLetterValue(char);
        }
    }

    return {
        total,
        final: reduceNumber(total, [11, 22, 33])
    };
}
