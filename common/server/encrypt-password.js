const Scrypt = require('scrypt-kdf');

const scryptParameters = { logN: 15 };

const encryptPassword = async (password) => {
    return (await Scrypt.kdf(password, scryptParameters)).toString('base64');
};
exports.encryptPassword = encryptPassword;

