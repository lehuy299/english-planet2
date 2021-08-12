const {normalizeSchema} = require("./normalize-schema");
// const {batchInsert} = require("../common/batch-insert");
const {sendQuery} = require("./send-query");

const initDB = async ({dbSchema, dbName, con, dataTables}) => {
    dbSchema = normalizeSchema(dbSchema);

    await sendQuery(`DROP DATABASE if exists \`${dbName}\``, null, con);
    await sendQuery(`CREATE DATABASE \`${dbName}\``, null, con);

    const tableNames = Object.keys(dbSchema.tables);

    // for (let i = tableNames.length - 1; i > -1; i--) {
    //     const tableName = tableNames[i];
    //     await sendQuery(`DROP TABLE \`${dbName}\`.\`${tableName}\``, null, con);
    // }

    for (const tableName of tableNames) {
        await sendQuery(`CREATE TABLE \`${dbName}\`.\`${tableName}\` (${createTableDeclaration(dbSchema.tables[tableName])})`, null, con);
    }

    // if (dataTables) {
    //     for (const tableName in dataTables) {
    //         let records = dataTables[tableName];
    //         if (records.length) {
    //             if (dbSchema.tables[tableName] == null) {
    //                 throw `Table does not exist [${tableName}]`;
    //             }
    //             await batchInsert(records, dbSchema.tables[tableName], con, dbName);
    //         }
    //     }
    // }
};

exports.initDB = initDB;

function collectIndices(table) {
    let ret = [];
    for (const fieldName in table.fields) {
        const field = table.fields[fieldName];
        if (field.indices == null) {
            continue;
        }
        for (const index of field.indices) {
            ret.push({fieldName});
        }
    }
    return ret;
}

function createTableDeclaration(table) {
    const primaryKeys = Object.keys(table.fields).filter((name) => table.fields[name].primaryKey);
    const foreignKeys = Object.keys(table.fields).filter((name) => table.fields[name].fk).map((name) => ({name, fk: table.fields[name].fk}));
    const indices = collectIndices(table);
    const sections = [
        // Fields
        [
            ... Object.keys(table.fields).map((fName) => `\`${fName}\` ${fieldDescription(table.fields[fName])}`),
        ].join(","),

        // Primary keys
        primaryKeys.length && `PRIMARY KEY (${primaryKeys.map((name) => `\`${name}\``).join(",")})`,

        // Unique keys
        // Object.keys(table.fields).filter((name) => table.fields[name].unique).map((name) => `UNIQUE KEY \`${name}_UNIQUE\` (\`${name}\`)`).join(","),

        foreignKeys.length && foreignKeys.map(({name, fk}) => `CONSTRAINT \`${table.name}$${name}_fk\` FOREIGN KEY (\`${name}\`) REFERENCES \`${fk.table}\` (\`${fk.field}\`)`).join(","),

        indices.length && indices.map((index) => `KEY \`${index.fieldName}_index\` (\`${index.fieldName}\`)`).join(","),

        Object.values(table.fields).find((fc) => fc.fulltext) && (
            Object.keys(table.fields).filter((fName) => table.fields[fName].fulltext).map((fName) => `FULLTEXT \`${table.name+"$"+fName+"_fulltext"}\` (${fName})`).join(",")
        ),
    ];

    return sections.filter((s) => s).join(",");
}
exports.createTableDeclaration = createTableDeclaration;


function fieldDescription(fieldConfig) {
    const type = () => {
        let ret = fieldConfig.type[0];
        if (fieldConfig.type.length > 1) {
            ret += `(${fieldConfig.type[1]})`;
        }
        return ret;
    };

    return type() +
        " " + (fieldConfig.nullable ? "default null" : "not null") +
        (fieldConfig.auto_increment ? " auto_increment" : "")
        ;
}
