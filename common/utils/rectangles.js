const {distance} = require("./points");

const distancePR = (p, rect) => {
    const {min, abs} = Math;
    if (p.x < rect.x + rect.width && p.x >= rect.x) {
        if (p.y < rect.y + rect.height && p.y >= rect.y) {
            return 0;
        } else {

            return min(abs(rect.y - p.y), abs(rect.height + p.y - rect.y));
        }
    } else {
        if (p.y < rect.y + rect.height && p.y >= rect.y) {
            return min(abs(rect.x - p.x), abs(rect.width + p.x - rect.x));
        } else {
            return min(
                distance(p, {x: rect.x, y: rect.y}),
                distance(p, {x: rect.x + rect.width, y: rect.y}),
                distance(p, {x: rect.x, y: rect.y + rect.height}),
                distance(p, {x: rect.x + rect.width, y: rect.y + rect.height}),
            );
        }
    }
};

exports.distancePR = distancePR;

const center = (rect) => {
    return {
        x: rect.x + rect.width /2,
        y: rect.y + rect.height /2,
    };
};

exports.center = center;

const byPoint = (point) => {
    return {
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
    };
};
exports.byPoint = byPoint;

const inside = (rect, point) => {
    return point.y >= rect.y && point.y <= rect.y + rect.height
        && point.x >= rect.x && point.x <= rect.x + rect.width
    ;
};
exports.inside = inside;

const expandRect = (rect, size) => ({
    x: rect.x - size,
    y: rect.y - size,
    width: rect.width + size*2,
    height: rect.height + size*2,
});
exports.expandRect = expandRect;

const scaleRect = (rect, ratio) => ({
    x: rect.x * ratio,
    y: rect.y * ratio,
    width: rect.width * ratio,
    height: rect.height * ratio,
});
exports.scaleRect = scaleRect;

const moveRect = (rect, by) => ({
    x: rect.x + by.x,
    y: rect.y + by.y,
    width: rect.width,
    height: rect.height,
});
exports.moveRect = moveRect;