const {cControllersFromServices} = require("../helpers/create-controllers");
const enrollmentServices = require("../services/enrollment");

const enrollmentControllers = cControllersFromServices(enrollmentServices);

module.exports = [
    {
        method: "GET",
        path: "/enrollment/:id",
        controller: enrollmentControllers.getEnrollment,
    }, 
    {
        method: "DELETE",
        path: "/enrollment/:id",
        controller: enrollmentControllers.deleteEnrollment,
    }, 
    {
        method: "PUT",
        path: "/enrollment",
        controller: enrollmentControllers.upsertEnrollment,
    },
    {
        method: "GET",
        path: "/enrollments",
        controller: enrollmentControllers.getEnrollments,
    },
    {
        method: "GET",
        path: "/enrollments/:id/receipts",
        controller: enrollmentControllers.getReceipts,
    },
];
