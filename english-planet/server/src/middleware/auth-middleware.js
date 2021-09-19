const {verifyJwtToken} = require("../../../../common/server/jwt");
const {UNAUTHORIZED, FORBIDDEN, createError} = require("../helpers/error-helper");
const {User} = require("../models/user");

const authenticateJWT = async (req, res, next) => {
    const unauthorizedErr = createError({status: UNAUTHORIZED, message: "Unauthorized"});
    try {
        const authToken = req.headers.auth_token;
        if (authToken == null) {
            return next(unauthorizedErr);
        }
        const auth = await verifyJwtToken(authToken);

        const user = await User.findOne({id: auth.user_id});

        if (!user || user.deleted) {
            return next(createError({status: FORBIDDEN, message: "Account deleted"}));
        }

        req.user = user;
        return next();
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            return next(unauthorizedErr);
        }
        console.error(e);
        console.error(e.stack);
        return next(createError());
    }
};
exports.authenticateJWT = authenticateJWT;
