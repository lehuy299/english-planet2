const {paddingLeft} = require("../utils/strings");

const formatDateS = (date) => {
    return date.getFullYear() + "-" + paddingLeft(date.getMonth() + 1) + "-" + paddingLeft(date.getDate());
};
exports.formatDateS = formatDateS;

const formatDateString = (date) => {
    const date1 = new Date(date);
    // return date1.getFullYear() + "-" + paddingLeft(date1.getMonth() + 1) + "-" + paddingLeft(date1.getDate());
    return paddingLeft(date1.getDate()) + "-" + paddingLeft(date1.getMonth() + 1) + "-" + date1.getFullYear();
};
exports.formatDateString = formatDateString;

