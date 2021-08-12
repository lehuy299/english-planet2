const webpack = require('webpack');
const {cs} = require("../../../common/react/chain-services");
const Path = require("path");

const buildSw = ({entry, output, devMode}) => {
    const compiler = webpack({
        mode: devMode ? "development" : "production",
        devtool: devMode ? "cheap-module-source-map" : false,
        entry: [
            entry
        ],
        output: {
            path: Path.dirname(output),
            filename: Path.basename(output),
        },
    });

    return new Promise((resolve, reject) => {
        cs(
            ["watch", (_, next) => {
                const cb = (err, stats) => {
                    if (err) {
                        reject(err);
                    } else {
                        next(stats);
                    }
                };
                return devMode ? compiler.watch({}, cb) : compiler.run(cb);
            }],
            ({watch}) => devMode ? (
                console.log(`Compiled service worker for ${watch.endTime-watch.startTime}ms`)
            ) : (
                resolve({duration: watch.endTime-watch.startTime})
            ),
        );
    });

};
exports.buildSw = buildSw;
