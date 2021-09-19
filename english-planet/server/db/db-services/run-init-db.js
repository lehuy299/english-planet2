const mysql = require("mysql2");
const {initDB} = require("./init-db");
const schema = require("../schema/schema");
const config = require("../../config/config");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "23e34r45t",
    // database: "english_planet",
});

(async () => {
    console.log(JSON.stringify(schema, null, 2));
    try {
        console.log("reseting...");

        await initDB({
            con,
            dbName: config.db.connection.database,
            dbSchema: schema,
        });
       
        console.log("done");
    } catch (e) {
        console.log(e);
    } finally {
        con.end();
    }
})();


