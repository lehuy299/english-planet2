const {createArray} = require("../../../../../../../common/utils/collections");

module.exports = [
    ...createArray(6).map((_, i) => (i+1).toString()),
    "Online", 
];
