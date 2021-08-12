const {getTeacherData} = require("../sample-data/teacher-data");
const tableName = require("../schema/tables/teacher").name;

exports.seed = async (knex) => {
    await knex(tableName).del();
    await knex(tableName).insert(getTeacherData());
}
