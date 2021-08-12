const paddingLeft = (num, length = 2) => {
    num = "" + num;

    for (;num.length < length;) {
        num = "0" + num;
    }
    return num;
};

exports.paddingLeft = paddingLeft;
exports.paddingLeft1 = paddingLeft;

const paddingRight = (num, length = 2) => {
    num = "" + num;

    for (;num.length < length;) {
        num += "0";
    }
    return num;
};

exports.paddingRight = paddingRight;

const reverse = function(str) {
    let ret = "";
    for (let i = str.length - 1; i > -1; i--) {
        ret += str[i];
    }
    return ret;
};
exports.reverse = reverse;

const hashCode = function(str) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash < 0 ? -hash : hash;
};
exports.hashCode = hashCode;


const selectByHash = (col, feed) => {
    return col[hashCode(feed) % col.length];
};
exports.selectByHash = selectByHash;

const commonStart = (...strs) => {
    for (let i = 0; ; i++) {
        if (strs[0] == null ? i === 0 : i === strs[0].length) {
            return strs[0];
        }
        for (const str of strs) {
            if (str != null && str[i] !== strs[0][i]) {
                return strs[0].substring(0, i);
            }
        }
    }
};
exports.commonStart = commonStart;

const upperCase1 = (str) => str[0].toUpperCase() + str.substring(1);
exports.upperCase1 = upperCase1;

const lowerCase1 = (str) => str[0].toLowerCase() + str.substring(1);
exports.lowerCase1 = lowerCase1;

const isNotBlank = (str) => str != null && typeof str === "string" && str.trim() !== "";
exports.isNotBlank = isNotBlank;

const deepTrim = (str) => str.replace(/\s{2,}/g, " ");
exports.deepTrim = deepTrim;

const isBlank = (str) => !isNotBlank(str);
exports.isBlank = isBlank;

const countHappens = (target, str) => {
    let index = 0;
    let count = 0;
    for (let i;(i = str.indexOf(target, index)) > -1;) {
        count++;
        index=i+target.length;
    }
    return count;
};
exports.countHappens = countHappens;

const createString = (str, count) => {
    let ret = "";
    for (let i = 0; i < count; i++) {
        ret += str;
    }
    return ret;
};
exports.createString = createString;
