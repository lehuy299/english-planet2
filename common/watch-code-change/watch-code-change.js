const NodeUtil = require("../utils/nodejs/node-util").NodeUtil;
const chokidar = require("chokidar");

const watchCodeChange = (startFn) => {
    let restart;

    (async () => {

        let unwatchedModules = NodeUtil.getLoadedSrcList();

        const start = async (onChange) => {
            let processStop = await startFn();

            let watchedModules = NodeUtil.getLoadedSrcList().filter((module) => unwatchedModules.indexOf(module) === -1);

            watchedModules = watchedModules.filter((p) => {
                return !require.cache[p].exports.persistentModule;
            });

            let watcher = chokidar.watch(watchedModules, {
                ignoreInitial: true,
                disableGlobbing: true,
                followSymlinks : false,
                usePolling: true,
            })
                .on('change', onChange)
            ;

            // console.log("unwatchedModules:")
            // console.log(unwatchedModules)

            // console.log("Watching:")
            // console.log(watchedModules)

            return async () => {
                processStop && await processStop();

                watcher.close();

                NodeUtil.removeSrcCache(watchedModules);
            };
        };


        restart = () => {
            stop().then(async () => {
                stop = await start(onChange);
            });
        };

        const onChange = (path) => {
            // console.log("Found change", Path.basename(path));

            restart();
        };

        let stop = await start(onChange);
    })();

    return {
        restart: () => restart(),
    };
};

exports.watchCodeChange = watchCodeChange;