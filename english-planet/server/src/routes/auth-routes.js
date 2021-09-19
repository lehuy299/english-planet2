const {implementRoutes} = require("../helpers/implement-routes");

const authRoutes = [
    ...require("./student"),
    ...require("./class"),
    ...require("./class-date"),
    ...require("./enrollment"),
    ...require("./receipt"),
    ...require("./teacher"),
    // ...require("./user"),
];

module.exports = implementRoutes(authRoutes);
