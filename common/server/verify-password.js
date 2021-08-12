const Scrypt = require('scrypt-kdf');

const verifyPassword = async (bin, password) => {
    try {
        return await Scrypt.verify(Buffer.from(bin, 'base64'), password);
    } catch (e) {
        return false;
    }
};

exports.verifyPassword = verifyPassword;