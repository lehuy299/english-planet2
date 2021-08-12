const {getClassData} = require("../sample-data/class-data");
const tableName = require("../schema/tables/class").name;

exports.seed = async (knex) => {
    await knex(tableName).del();
    await knex(tableName).insert(getClassData());
}
