const {cs, provideContext} = require("cs-react");
const {matchPath} = require("react-router-dom");
const {buildUrlQuery} = require("../../../../../common/browser/build-url-query");
const {parseUrlQuery} = require("../../../../../common/browser/parse-url-query");

const loadRouting = ({routerHistory, paths, next}) => {

    const getBasePath = (pathname) => {
        const getBase = (p) => /^\/([^/]*)/.exec(p)?.[0];
        return paths.find((p) => pathname.startsWith(getBase(p)));
    };

    const parseParams = (pathname) => {
        const matched = matchPath(pathname, {
            path: getBasePath(pathname),
            exact: true,
            strict: true,
        });
        return matched?.params;
    };

    const buildParamsPath = (path, params) => {
        return getBasePath(path).replace(/:(\w+)/g, (s) => encodeURIComponent(params[s.substring(1)]));
    };

    return cs(
        ["routing", (_, next) => {
            return next({
                goto: (path, {params, query}={}) => {
                    const path1 = (params ? buildParamsPath(path, params) : path) 
                        + (query ? buildUrlQuery(query) : "");
                    routerHistory.push(path1);
                },
                getParams: () => parseParams(routerHistory.location.pathname),
                getQuery: () => parseUrlQuery(routerHistory.location.search),
            });
        } ],
        ({routing}) => provideContext("routing", routing, next)
    );
};
exports.loadRouting = loadRouting;
