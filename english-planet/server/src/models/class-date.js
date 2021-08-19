const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize, cRecordsDeserialize} = require('../../db/db-services/deserialize-field');

const classDateTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/class_date")
);

const initModel = (knex) => {
    const tableName = classDateTableConfig.name;
    const serialize = cSerialize(classDateTableConfig);
    const deserialize = cDeserialize(classDateTableConfig);
    const recordsDeserialize = cRecordsDeserialize(deserialize);

    const actions = createModelActions({
        knex,
        tableName,
        serialize,
        deserialize,
    });

    const getClassDatesInDateRange = async (dateRange) => {
        return await knex.select().from(tableName)
            .where("date", ">=", dateRange.from)
            .andWhere("date", "<=", dateRange.to)
            .then(recordsDeserialize);
    };

    const deleteClassDatesOfClass = async (classId) => {
        return await knex.del()
            .from(tableName)
            .where({class_id: classId})
    };

    return {
        ...actions,
        getClassDatesInDateRange,
        deleteClassDatesOfClass,
    }
}
exports.ClassDate = createModel(initModel);
