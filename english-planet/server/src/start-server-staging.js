const {startServer} = require("./server");
const config = require("../config/config");

console.log(111, config)
startServer({port: config.app.port});
