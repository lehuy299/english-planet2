const {getEnrollmentData} = require("../sample-data/enrollment-data");
const tableName = require("../schema/tables/enrollment").name;

exports.seed = async (knex) => {
    await knex(tableName).del();
    await knex(tableName).insert(getEnrollmentData());
}
