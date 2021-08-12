const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize} = require('../../db/db-services/deserialize-field');

const receiptTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/receipt")
);

const initModel = (knex) => {
    const actions = createModelActions({
        knex,
        tableName: receiptTableConfig.name,
        serialize: cSerialize(receiptTableConfig),
        deserialize: cDeserialize(receiptTableConfig),
    })

    return {
        ...actions,
    }
}
exports.Receipt = createModel(initModel);
