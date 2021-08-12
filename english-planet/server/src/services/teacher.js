const {Teacher} = require("../models/teacher");

module.exports = [
    {
        createTeacher: async ({params, body} = {}) => {
            return await Teacher.create(body);
        },
    },
    {
        deleteTeacher: async ({params, body} = {}) => {

        },
    },
    {
        updateTeacher: async ({params, body} = {}) => {

        },
    },
    {
        getTeacher: async ({params, body} = {}) => {
            console.log(111, params);
            return await Teacher.findOne({id: params.id});
        },
    },
    {
        getTeachers: async ({params, body} = {}) => {
            return await Teacher.find({inactive: false});
        },
    },
    {
        getTeacherReportByDateRange: async ({params, body} = {}) => {
            // input: teacherId and date range
            // report: teaching class dates
        },
    },
    {
        upsertTeacher: async ({params, body} = {}) => {
            if (!body.id) {
                return await Teacher.create(body);
            } else {
                return await Teacher.update(body);
            }
        },
    },
];
