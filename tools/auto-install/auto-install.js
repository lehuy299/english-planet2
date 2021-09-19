const {scanFiles} = require("./scan-files");
const Path = require("path");
const {cmd2} = require("../../common/utils/nodejs/spawn-util");

const autoInstall = async ({dir}) => {
    const pacDirs = await (async () => {
        let files = [];
        await scanFiles({
            dir,
            onFile: (path) => {
                if (path.endsWith("/package.json")) {
                    return files.push(Path.dirname(path));
                }
            },
            ignoreDir: (dir) => {
                return dir === "node_modules" || dir === "dist";
            },
        });
        return files;
    })();

    for (const pacDir of pacDirs) {
        console.log("Installing", pacDir);
        const {out, err} = await cmd2("npm i", {cwd: pacDir});
        if (err) {
            console.error(err);
            // console.log(out)
            // return;
        }
        console.log(out);
    }
};

exports.autoInstall = autoInstall;
