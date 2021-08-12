const {getStudentData} = require("../sample-data/student-data");
const tableName = require("../schema/tables/student").name;

exports.seed = async (knex) => {
  await knex(tableName).del();
  await knex(tableName).insert(getStudentData());
}
