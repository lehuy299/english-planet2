const env = process.argv[2] || "dev";
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile[env]);

module.exports = knex;
