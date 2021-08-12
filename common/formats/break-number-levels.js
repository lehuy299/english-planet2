
const breakNumberLevels = (num, level) => {
    let ret = [];
    const sign = num < 0 ? "-" : "";

    num = "" + Math.abs(Math.round(num));

    for (let i = 0; num.length; i++) {
        const pos = Math.max(0, num.length - level);
        ret.push(num.substring(pos));

        num = num.substring(0, pos);
    }

    return {
        levels: ret.reverse(),
        sign
    };
};
exports.breakNumberLevels = breakNumberLevels;
