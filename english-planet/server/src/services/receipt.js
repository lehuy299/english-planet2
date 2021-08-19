const {Receipt} = require("../models/receipt");

module.exports = [
    {
        upsertReceipt: async ({params, body} = {}) => {
            if (!body.id) {
                return await Receipt.create({...body, time: Date.now()});
            } else {
                return await Receipt.update(body);
            }
        },
    },
    {
        deleteReceipt: async ({params, body} = {}) => {
            return await Receipt.destroy(params.id);
        },
    },
    {
        getReceipt: async ({params, body} = {}) => {
            return await Receipt.findOne({id: params.id});
        },
    },
    // {
    //     getReceiptsByStudentId: async ({params, body} = {}) => {
    //         // return all receipts for a student
    //     },
    // },
];
