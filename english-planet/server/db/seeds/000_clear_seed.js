
exports.seed = async (knex) => {
    await knex("enrollment").del();
    await knex("class").del();
    await knex("teacher").del();
};
