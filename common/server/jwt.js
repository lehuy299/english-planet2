const jwt = require('jsonwebtoken');


const key = "je328f27h3";

const createJwtToken = (content, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(content, key, options, function(err, token) {
            resolve(token);
        });
    });
};
exports.createJwtToken = createJwtToken;

const verifyJwtToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, function(err, decoded) {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};
exports.verifyJwtToken = verifyJwtToken;