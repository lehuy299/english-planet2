const {Class} = require("../models/class");
const {Enrollment} = require("../models/enrollment");
const {ClassDate} = require("../models/class-date");
const {omit} = require("../../../../common/utils/objects");
const {Receipt} = require("../models/receipt");

module.exports = [
    {
        createClass: async ({params, body} = {}) => {
            return await Class.create(body);
        },
    },
    {
        deleteClass: async ({params, body} = {}) => {

        },
    },
    {
        updateClass: async ({params, body} = {}) => {

        },
    },
    {
        getClass: async ({params, body} = {}) => {
            return await Class.findOne({id: params.id});
        },
    },
    {
        getClasses: async ({params, body} = {}) => {
            return await Class.find({inactive: false});
        },
    },
    {
        getActiveClasses: async ({params, body} = {}) => {

        },
    },
    {
        searchClasses: async ({params, body}={}) => {
            // search by a set of conditions (name, date start, ...)
        },
    },
    {
        upsertClass: async ({params, body} = {}) => {
            if (!body.id) {
                return await Class.create(body);
            } else {
                if (body.inactive) {
                    const enrollments = await Enrollment.getEnrollmentsByClassId(body.id);
                    if (enrollments?.length > 0) {
                        await Receipt.deleteReceiptsOfEnrollments(enrollments.map((erm) => erm.id));
                    }
                    await Enrollment.deleteEnrollmentsOfClass(body.id);
                    await ClassDate.deleteClassDatesOfClass(body.id);
                }
                return await Class.update(body);
            }
        },
    },
];
