const knex = require("../../config/database");

const createModel = (initModel) => {
    return initModel(knex);
};
module.exports = createModel;
