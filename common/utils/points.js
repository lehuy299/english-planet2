const addVector = (p, v) => {
    return {
        x: p.x + v.x,
        y: p.y + v.y,
    };
};
exports.addVector = addVector;

const distance = (p1, p2) => {
    return Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};
exports.distance = distance;

const applyBothXY = (p, fn) => {
    return {
        x: fn(p.x),
        y: fn(p.y),
    };
};
exports.applyBothXY = applyBothXY;
