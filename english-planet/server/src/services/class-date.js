const {ClassDate} = require("../models/class-date");

module.exports = [
    {
        getClassDate: async ({params, body} = {}) => {
            return await ClassDate.findOne({id: params.id});
        },
    },
    {
        getClassDatesOfClass: async ({params, body} = {}) => {
            return await ClassDate.find({class_id: params.classId});
        },
    },
    {
        createClassDates: async ({params, body} = {}) => {
            return await ClassDate.batchInsert(body);
        },
    },
    {
        deleteClassDate: async ({params, body} = {}) => {
            return await ClassDate.destroy(params.id);
        },
    },
    {
        deleteClassDatesOfClass: async ({params, body} = {}) => {
            return await ClassDate.deleteClassDatesOfClass(params.classId);
        },
    },
    {
        upsertClassDate: async ({params, body} = {}) => {
            if (!body.id) {
                return await ClassDate.create(body);
            }
            return await ClassDate.update(body);
        },
    },
    {
        getClassDatesInDateRange: async ({params, query, body} = {}) => {
            return await ClassDate.getClassDatesInDateRange({dateRange: query});
        },
    },
];
