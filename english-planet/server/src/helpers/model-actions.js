const {v1: uuid} = require("uuid");

module.exports = ({
    knex,
    tableName,
    serialize, deserialize,
    timeout = 1000
}) => {

    const create = async (props) => {
        const id = uuid();
        await knex.insert({id, ...serialize(props)})
            .returning()
            .into(tableName)
            .timeout(timeout);

        return {id, ...props};
    };

    const batchInsert = async (records) => {
        const newRecords = records.map((r) => ({id: uuid(), ...r}));

        await knex.batchInsert(
            tableName, 
            newRecords.map(({id, ...others}) => ({id, ...serialize(others)}))
        );

        return newRecords;
    };

    const findAll = async () => {
        const results = await knex.select()
            .from(tableName)
            .timeout(timeout);

        return results.map((r) => deserialize(r));
    }

    const find = async (filters) => {
        const results = await knex.select()
            .from(tableName)
            .where(filters)
            .timeout(timeout);

        return results.map((r) => deserialize(r));
    }

    // Same as `find` but only returns the first match if >1 are found.
    const findOne = async (filters) => {
        const results = await find(filters);
        if (!Array.isArray(results)) {
            return results;
        }
        return results[0];
    }

    const findById = async (id) => {
        const result = await knex.select()
            .from(tableName)
            .where({id})
            .timeout(timeout);

        return deserialize(result);
    }

    const update = async ({id, ...updates}) => {
        await knex.update(serialize(updates))
            .from(tableName)
            .where({ id })
            .timeout(timeout);

        return {id, ...updates};
    }

    const destroy = (id) => knex.del()
        .from(tableName)
        .where({ id })
        .timeout(timeout);

    return {
        tableName,
        timeout,
        create,
        batchInsert,
        findAll,
        find,
        findOne,
        findById,
        update,
        destroy
    }
}
