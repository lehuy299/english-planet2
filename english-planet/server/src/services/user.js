const {User} = require("../models/user");

module.exports = [
    {
        getUser: async ({params, payload} = {}) => {
            return await User.find({id: params.id});
        },
    },
    {
        createUser: async ({params, payload} = {}) => {
            return await User.create(payload);
        },
    },
];
