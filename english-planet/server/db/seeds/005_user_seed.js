const tableName = require("../schema/tables/user").name;
const {getUserData} = require("../sample-data/user-data");

exports.seed = async (knex) => {
    const data = await getUserData();
    await knex(tableName).del();
    await knex(tableName).insert(data);
}
