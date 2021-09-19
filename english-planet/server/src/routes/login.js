const {cControllersFromServices} = require("../helpers/create-controllers");
const userServices = require("../services/user");

const userControllers = cControllersFromServices(userServices);

module.exports = [
    {
        method: "POST",
        path: "/user/login",
        controller: userControllers.login,
    },
];
