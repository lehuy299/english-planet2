const fs = require("fs");
const {parseUrl} = require("../parse-url");

const {promisify} = require("util");
const readFileAsync = promisify(fs.readFile);

function sendFile({url, headers}, filePath) {
    const {path, host, port, protocol} = parseUrl(url);

    return new Promise(async (resolve, reject) => {

        const buffer = await readFileAsync(filePath);

        const req = require(protocol).request({
            ...{path, host, port},
            method: "POST",
            headers,
        }, (res) => {
            resolve(res);
        });

        req.write(buffer);

        req.end();

    });

}
exports.sendFile = sendFile;