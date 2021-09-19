const {watchCodeChange} = require("../../../common/watch-code-change/watch-code-change");
const config = require("../config/config");

// global.DEV_MODE = true;
watchCodeChange(() => {
    const {startServer} = require("./server");
    return startServer({port: config.app.port});
});
