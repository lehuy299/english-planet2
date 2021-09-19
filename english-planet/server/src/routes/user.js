const {cControllersFromServices} = require("../helpers/create-controllers");
const userServices = require("../services/user");

const userControllers = cControllersFromServices(userServices);

module.exports = [
    {
        method: "GET",
        path: "/user/:id",
        controller: userControllers.getUser,
    },
];
