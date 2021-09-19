const {last} = require("../../../../common/utils/collections");

const controllerWrapper = (action, actionConfigs={}) => async (req, res, next) => {
    try {
        const result = await action(req, res);
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
