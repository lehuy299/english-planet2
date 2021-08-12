const stringToList = (str) => str?.trim().split(/\s*,\s*/).filter((v) => v);
exports.stringToList = stringToList;
