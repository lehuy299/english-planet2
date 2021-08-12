const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize} = require('../../db/db-services/deserialize-field');

const teacherTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/teacher")
);

const initModel = (knex) => {
    const actions = createModelActions({
        knex,
        tableName: teacherTableConfig.name,
        serialize: cSerialize(teacherTableConfig),
        deserialize: cDeserialize(teacherTableConfig),
    })

    return {
        ...actions,
    }
}
exports.Teacher = createModel(initModel);
