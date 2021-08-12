const {cache0} = require("../../../../common/utils/cache0");

const isDev = cache0(() => localStorage.getItem("DEV"));
exports.isDev = isDev;
