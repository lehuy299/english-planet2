const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize} = require('../../db/db-services/deserialize-field');

const studentTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/student")
);

const initModel = (knex) => {
    const actions = createModelActions({
        knex,
        tableName: studentTableConfig.name,
        serialize: cSerialize(studentTableConfig),
        deserialize: cDeserialize(studentTableConfig),
    })


    return {
        ...actions,
    }
}
exports.Student = createModel(initModel);
