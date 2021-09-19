const Path = require("path");
const {autoInstall} = require("../../tools/auto-install/auto-install");

const dirs = [
    Path.resolve(__dirname + "/../../common"),
    Path.resolve(__dirname + "/../../english-planet"),
    Path.resolve(__dirname + "/../../tools/web-builder"),
    // Path.resolve(__dirname + "/../../english-planet/server"),
    // Path.resolve(__dirname + "/../../english-planet/client"),
];

(async () => {
    for (const dirPath of dirs) {
        await autoInstall({dir: dirPath});
    }
})()
