const {last} = require("../../../../common/utils/collections");
const {createError} = require("./error-helper");

const controllerWrapper = (action, actionConfigs={}) => async (req, res, next) => {
    const {params, query, body} = req;
    try {
        const result = await action({params, query, body});
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const cControllersFromServices = (actions) => {
    let ret = {}; 
    actions.forEach((action) => {
        const actionName = last(Object.keys(action));
        ret[actionName] = controllerWrapper(action[actionName]);
    })
    return ret;
};

exports.cControllersFromServices = cControllersFromServices;
