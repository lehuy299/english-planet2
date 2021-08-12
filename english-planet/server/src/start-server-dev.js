const {watchCodeChange} = require("../../../common/watch-code-change/watch-code-change");

// global.DEV_MODE = true;
watchCodeChange(() => {
    const {startServer} = require("./server");
    return startServer({port: 2912});
});
