
const wbStartDevServer = ({paths, proxy, port}) => {

    const paths1 = require('./config/paths');

    const {startDevServer} = require("./scripts/start");
    startDevServer({
        paths: {
            ...paths1,
            ...paths,
        },
        proxy,
        port,
    });
};
exports.wbStartDevServer = wbStartDevServer;

const wbBuildWeb = ({paths}) => {
    const paths1 = require('./config/paths');

    const {buildWeb} = require("./scripts/build");
    // const {buildServiceWorker} = require("./scripts/build-sw");
    return buildWeb({
        paths: {
            ...paths1,
            ...paths,
        },
    });
};
exports.wbBuildWeb = wbBuildWeb;
