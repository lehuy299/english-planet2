const {implementRoutes} = require("../helpers/implement-routes");

const guestRoutes = [
    ...require("./login"),
];

module.exports = implementRoutes(guestRoutes);
