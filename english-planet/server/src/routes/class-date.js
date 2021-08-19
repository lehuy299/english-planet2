const {cControllersFromServices} = require("../helpers/create-controllers");
const classDateServices = require("../services/class-date");

const classDateControllers = cControllersFromServices(classDateServices);

module.exports = [
    {
        method: "GET",
        path: "/class-date/:id",
        controller: classDateControllers.getClassDate,
    }, 
    {
        method: "GET",
        path: "/class-dates/class/:classId",
        controller: classDateControllers.getClassDatesOfClass,
    }, 
    {
        method: "PUT",
        path: "/class-date",
        controller: classDateControllers.upsertClassDate,
    },
    {
        method: "GET",
        path: "/class-dates",
        controller: classDateControllers.getClassDatesInDateRange,
    },
    {
        method: "POST",
        path: "/class-dates",
        controller: classDateControllers.createClassDates,
    },
    {
        method: "DELETE",
        path: "/class-date/:id",
        controller: classDateControllers.deleteClassDate,
    },
    {
        method: "DELETE",
        path: "/class-dates/class/:classId",
        controller: classDateControllers.deleteClassDatesOfClass,
    },
];
