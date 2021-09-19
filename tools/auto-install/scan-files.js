const {promisify} = require("util");
const fs = require("fs");
const lstatAsync = promisify(fs.lstat);
const readDirAsync = promisify(fs.readdir);

const scanFiles = async ({dir, onFile, ignoreDir}) => {

    const subs = await readDirAsync(dir);

    await Promise.all(subs.map(async (sub) => {
        const subPath = dir + "/" + sub;
        const stats = await lstatAsync(subPath);
        if (stats.isDirectory()) {
            if (!ignoreDir || !(await ignoreDir(sub, dir))) {
                await scanFiles({dir: subPath, onFile, ignoreDir});
            }
        } else {
            onFile && (await onFile(subPath));
        }
    }));
};
exports.scanFiles = scanFiles;
