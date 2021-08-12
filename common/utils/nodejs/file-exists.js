const fsp = require("fs/promises");

const fileExists = async (filePath) => {
    try {
        await fsp.access(filePath);
        return true;
    } catch {
        return false;
    }
};
exports.fileExists = fileExists;
