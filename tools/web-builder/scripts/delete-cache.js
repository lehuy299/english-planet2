const fse = require("fs-extra");
const Path = require("path");

fse.emptyDir(Path.resolve(__dirname, "../node_modules/.cache/babel-loader"));
