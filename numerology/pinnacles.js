// ======================
// Tính 4 Đỉnh Cao đời người
// ======================
function calculatePinnacles(dob) {
    let parts = dob.split("-");

    let d = parseInt(parts[2]);
    let m = parseInt(parts[1]);
    let y = parseInt(parts[0]);

    let p1 = reduce(d + m);
    let p2 = reduce(d + y);
    let p3 = reduce(p1 + p2);
    let p4 = reduce(m + y);

    return [p1, p2, p3, p4];
}

function reduce(num) {
    while(num > 9 && num !== 11 && num !== 22) {
        num = num.toString().split("").reduce((a,b)=>a+parseInt(b),0);
    }
    return num;
}
