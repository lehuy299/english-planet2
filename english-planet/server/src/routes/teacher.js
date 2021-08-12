const {cControllersFromServices} = require("../helpers/create-controllers");
const teacherServices = require("../services/teacher");

const teacherControllers = cControllersFromServices(teacherServices);

module.exports = [
    {
        method: "GET",
        path: "/teacher/:id",
        controller: teacherControllers.getTeacher,
    },
    {
        method: "GET",
        path: "/teachers",
        controller: teacherControllers.getTeachers,
    }, 
    {
        method: "PUT",
        path: "/teacher",
        controller: teacherControllers.upsertTeacher,
    },
];
