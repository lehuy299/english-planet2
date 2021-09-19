const env = process.argv[2];
const knexfile = require('../knexfile')

const dev = {
    app: {
        port: 2912
    },
    db: knexfile["dev"]
};

const staging = {
    app: {
        port: 2912
    },
    db: knexfile["staging"]
};

const configs = {
    dev,
    staging
};

module.exports = configs[env];
