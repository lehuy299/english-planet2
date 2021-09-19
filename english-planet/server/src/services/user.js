const {createJwtToken} = require("../../../../common/server/jwt");
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
    {
        login: async (req, res) => {
            const {login_name, password} = req.body;
            const status = await User.verify({login_name, password});
            let token;
            if (status.user?.id) {
                token = await createJwtToken({user_id: status.user.id}, {expiresIn: "1d"});
            }
            return {...status, token};
        },
    },
];
