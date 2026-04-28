// ======================
// Tính con số chủ đạo
// ======================
function calculateLifePath(dob) {
    const [year, month, day] = dob.split('-').map(Number);

    // Rút gọn ngày (1-9)
    const reducedDay = reduceNumber(day, [9]);

    // Rút gọn tháng (1-9)
    const reducedMonth = reduceNumber(month, [9]);

    // Rút gọn năm (giữ 11,22,33)
    const reducedYear = reduceNumber(year, [11, 22, 33]);

    // Tổng cuối cùng
    const total = reducedDay + reducedMonth + reducedYear;
    const finalNumber = reduceNumber(total, [11, 22, 33]);

    return {
        day: reducedDay,
        month: reducedMonth,
        year: reducedYear,
        total: total,
        final: finalNumber
    };
}
