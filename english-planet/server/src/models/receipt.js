const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize, cRecordsDeserialize} = require('../../db/db-services/deserialize-field');

const receiptTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/receipt")
);

const initModel = (knex) => {
    const tableName = receiptTableConfig.name;
    const serialize = cSerialize(receiptTableConfig);
    const deserialize = cDeserialize(receiptTableConfig);
    const recordsDeserialize = cRecordsDeserialize(deserialize);

    const actions = createModelActions({
        knex,
        tableName,
        serialize,
        deserialize,
    })

    const deleteReceiptsOfEnrollment = async (enrollmentId) => {
        return await knex.del()
            .from(tableName)
            .where({enrollment_id: enrollmentId})
    };

    return {
        ...actions,
        deleteReceiptsOfEnrollment,
    }
}
exports.Receipt = createModel(initModel);
