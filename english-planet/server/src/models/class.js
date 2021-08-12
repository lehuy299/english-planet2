const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize} = require('../../db/db-services/deserialize-field');

const classTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/class")
);

const initModel = (knex) => {
    const actions = createModelActions({
        knex,
        tableName: classTableConfig.name,
        serialize: cSerialize(classTableConfig),
        deserialize: cDeserialize(classTableConfig),
    })

    return {
        ...actions,
    }
}
exports.Class = createModel(initModel);
