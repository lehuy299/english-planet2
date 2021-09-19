const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize, cRecordsDeserialize} = require('../../db/db-services/deserialize-field');
const {Receipt} = require("./receipt");

const enrollmentTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/enrollment")
);

const initModel = (knex) => {
    const tableName = enrollmentTableConfig.name;
    const serialize = cSerialize(enrollmentTableConfig);
    const deserialize = cDeserialize(enrollmentTableConfig);
    const recordsDeserialize = cRecordsDeserialize(deserialize);

    const actions = createModelActions({
        knex,
        tableName,
        serialize,
        deserialize,
    });

    const getEnrollmentsByStudentIds = async (studentIds) => {
        return await knex.select().from(tableName)
            .whereIn("student_id", studentIds)
            .then(recordsDeserialize);
    };

    const getEnrollmentsByClassId = async (classId) => {
        return await knex.select("id").from(tableName)
            .where("class_id", classId)
            .then(recordsDeserialize);
    };

    const deleteEnrollmentsOfClass = async (classId) => {
        return await knex.del()
            .from(tableName)
            .where({class_id: classId})
    };

    return {
        ...actions,
        getEnrollmentsByClassId,
        getEnrollmentsByStudentIds,
        deleteEnrollmentsOfClass,
    }
}
exports.Enrollment = createModel(initModel);
