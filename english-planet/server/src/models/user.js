const {encryptPassword} = require('../../../../common/server/encrypt-password');
const {verifyPassword} = require('../../../../common/server/verify-password');
const createModel = require('../helpers/create-model');
const createModelActions = require('../helpers/model-actions');
const {normalizeTableConfig} = require('../../db/db-services/normalize-schema');
const {cSerialize} = require('../../db/db-services/serialize-field');
const {cDeserialize} = require('../../db/db-services/deserialize-field');

const userTableConfig = normalizeTableConfig(
    require("../../db/schema/tables/user")
);

const initModel = (knex) => {
    const actions = createModelActions({
        knex,
        tableName: userTableConfig.name,
        serialize: cSerialize(userTableConfig),
        deserialize: cDeserialize(userTableConfig),
    })

    const create = async (user) => {
        return await actions.create({...user, password: await encryptPassword(user.password), created_at: new Date()});
    }

    const verify = async (username, password) => {
        const user = await knex.select()
            .from(tableName)
            .where({username})
            .timeout(actions.timeout);

        if (user == null) {
            return {success: false, error: "invalid_grant", code: 2364};
        }

        const userPassword = user.password;
        delete user.password;

        if (!userPassword || !await verifyPassword(userPassword, password)) {
            return {success: false, error: "invalid_grant", code: 9374};
        }

        // if (!user.role) {
        //   return {success: false, error: "no_role"};
        // }

        // await setAuth({user_id: user.id});

        return {
            success: true,
            user_id: user.id,
        };
    }

    // TODO user password
    return {
        ...actions,
        create,
        verify
    }
}
exports.User = createModel(initModel);
