
const implementRoutes = (routes) => {
    const router = require("express").Router();
    routes.forEach(({method, path, controller}) => {
        router.route(path)[method.toLowerCase()](controller)
    });
    return router;
};
exports.implementRoutes = implementRoutes;
