const {cControllersFromServices} = require("../helpers/create-controllers");
const receiptServices = require("../services/receipt");

const receiptControllers = cControllersFromServices(receiptServices);

module.exports = [
    {
        method: "PUT",
        path: "/receipt",
        controller: receiptControllers.upsertReceipt,
    },
    {
        method: "DELETE",
        path: "/receipt/:id",
        controller: receiptControllers.deleteReceipt,
    },
];
