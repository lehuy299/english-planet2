const {Student} = require("../models/student");
const {Class} = require("../models/class");
const {Enrollment} = require("../models/enrollment");
const {flatten1} = require("../../../../common/utils/collections");
const {omit} = require("../../../../common/utils/objects");

module.exports = [
    {
        createStudent: async ({params, body} = {}) => {
            return await Student.create(body);
        },
    },
    {
        deleteStudent: async ({params, body} = {}) => {

        },
    },
    {
        upsertStudent: async ({params, body} = {}) => {
            const student = omit(body, ["class_ids"]);
            if (!student.id) {
                return await Student.create(student);
            } else {
                return await Student.update(student);
            }
        },
    },
    {
        getStudent: async ({params, body} = {}) => {
            return await Student.findOne({id: params.id});
        },
    },
    {
        getStudents: async ({params, body} = {}) => {
            const students = await Student.find({inactive: false});
            const enrollments = await Enrollment.getEnrollmentsByStudentIds(students.map((s) => s.id));
            return students.map((s) => ({...s, class_ids: enrollments.filter((e) => e.student_id === s.id).map((e) => e.class_id)}));
        },
    },
    {
        getEnrollmentsByStudentId: async ({params, body} = {}) => {
            return await Enrollment.getEnrollmentsByStudentIds([params.id]);
        },
    },
    {
        upsertEnrollments: async ({params, body: updatedEnrollments} = {}) => {
            const currentEnrollments = await Enrollment.getEnrollmentsByStudentIds([params.id]);
            let newEnrollments = [];

            for (const erm of updatedEnrollments) {
                if (!erm.id) {
                    newEnrollments.push(await Enrollment.create(erm));
                } else {
                    newEnrollments.push(await Enrollment.update(erm));
                }
            }

            for (const ce of currentEnrollments) {
                if (!updatedEnrollments.find((e) => e.id === ce.id)) {
                    await Enrollment.destroy(ce.id)
                }
            }

            return newEnrollments;
        },
    }
];
