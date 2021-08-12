const {cControllersFromServices} = require("../helpers/create-controllers");
const classServices = require("../services/class");

const classControllers = cControllersFromServices(classServices);

module.exports = [
    {
        method: "GET",
        path: "/class/:id",
        controller: classControllers.getClass,
    }, 
    {
        method: "GET",
        path: "/classes",
        controller: classControllers.getClasses,
    }, 
    {
        method: "PUT",
        path: "/class",
        controller: classControllers.upsertClass,
    },
];
