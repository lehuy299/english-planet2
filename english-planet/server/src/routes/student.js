const {cControllersFromServices} = require("../helpers/create-controllers");
const studentServices = require("../services/student"); 

const studentControllers = cControllersFromServices(studentServices); 

module.exports = [
    {
        method: "GET",
        path: "/student/:id",
        controller: studentControllers.getStudent,
    }, 
    {
        method: "GET",
        path: "/students",
        controller: studentControllers.getStudents,
    },
    {
        method: "PUT",
        path: "/student",
        controller: studentControllers.upsertStudent,
    },
    {
        method: "GET",
        path: "/student/:id/enrollments",
        controller: studentControllers.getEnrollmentsByStudentId,
    },
    {
        method: "PUT",
        path: "/student/:id/enrollments",
        controller: studentControllers.upsertEnrollments,
    },
];

