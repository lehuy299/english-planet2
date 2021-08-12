const {flatten1} = require("../../../../common/utils/collections");
const {Enrollment} = require("../models/enrollment");
const {Receipt} = require("../models/receipt");

module.exports = [
    // {
    //     deleteEnrollment: async ({params, body} = {}) => {

    //     },
    // },
    {
        upsertEnrollment: async ({params, body} = {}) => {
            if (!body.id) {
                return await Enrollment.create(body);
            } else {
                return await Enrollment.update(body);
            }
        },
    },
    {
        getEnrollment: async ({params, body} = {}) => {
            return await Enrollment.findOne({id: params.id});
        },
    },
    {
        getEnrollmentsByStudentIds: async ({params, body: studentIds} = {}) => {
            return flatten1(await Promise.all(studentIds.map((sId) => Enrollment.find({id: sId}))));
        },
    },
    {
        getEnrollments: async ({params, query, body} = {}) => {
            return Enrollment.find(query);
        },
    },
    {
        getReceipts: async ({params, query, body} = {}) => {
            return Receipt.find({enrollment_id: params.id});
        },
    },
    // {
    //     getFeeReportByStudentId: async ({params, body}={}) => {
    //         // class fee report of a student: class dates, fee, paid amount, unpaid amount, ...
    //         // to make this report: refer class date table, receipt table, enrollment table
    //     },
    // },
];
