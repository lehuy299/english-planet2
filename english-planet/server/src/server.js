const {waitUntil} = require("../../../common/utils/wait-until");
const {serverApp} = require("./app");
const knex = require("../config/database");

const startServer = async ({port}) => {
    if (!await ensureDbConnection(knex)) {
        console.error("Fail to connect to database, exiting");
        return;
    }

    const app = serverApp({port});

    const server = app.listen(port, () =>
        console.log(`Server started on ${port}`)
    );

    return () => {
        server.close();
    };
};
exports.startServer = startServer;

const ensureDbConnection = async (knex) => {
    return await waitUntil(async () => {
        try {
            await knex.raw("SELECT version()");
            return true;
        } catch (e) {
            console.error("Failed to connect to database, will try again in 1s");
            return false;
        }
    }, {timeLimit: 5 * 1000});
};
