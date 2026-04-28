// ======================
// Tính con số ngày sinh
// ======================
function calculateBirthdayNumber(dob) {
    const day = Number(dob.split('-')[2]);

    return {
        day,
        final: reduceNumber(day, [11, 22])
    };
}
