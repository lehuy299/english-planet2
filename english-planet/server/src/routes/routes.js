const {implementRoutes} = require("../helpers/implement-routes");

const allRoutes = [
    ...require("./student"),
    ...require("./class"),
    ...require("./class-date"),
    ...require("./enrollment"),
    ...require("./receipt"),
    ...require("./teacher"),
];

module.exports = implementRoutes(allRoutes);
