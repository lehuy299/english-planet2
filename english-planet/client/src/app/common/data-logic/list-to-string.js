const { unique } = require("../../../../../../common/utils/collections");

const listToString = (list) => unique(list)?.join(",");
exports.listToString = listToString;
