function calculateLifePath(dob) {
    const [year, month, day] = dob.split('-').map(Number);

    const reducedDay = reduceNumber(day, [11, 22]);
    const reducedMonth = reduceNumber(month);
    const reducedYear = reduceNumber(year, [11, 22, 33]);

    const total = reducedDay + reducedMonth + reducedYear;
    const finalNumber = reduceNumber(total, [11, 22, 33]);

    return {
        day: reducedDay,
        month: reducedMonth,
        year: reducedYear,
        total,
        final: finalNumber
    };
}
