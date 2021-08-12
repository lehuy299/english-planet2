const {mapValues} = require("../../../../common/utils/objects");

function normalizeSchema(schema) {
    console.log(111, schema);
    return {
        ...schema,
        tables: (() => {
            let ret = {};
            schema.tables.forEach((tableSchema) => {
                if (tableSchema.fields == null) {
                    throw "Invalid schema: " + tableSchema;
                }
                ret[tableSchema.name] = normalizeTableConfig(tableSchema);
            });
            return ret;
        })(),
    };
}
exports.normalizeSchema = normalizeSchema;

const normalizeTableConfig = (table) => ({
    ...table,
    fields: mapValues(table.fields, normalizeFieldConfig),
});
exports.normalizeTableConfig = normalizeTableConfig;

const type1s = [
    "date",
    "json",
    "timestamp",
    "int",
    "tinyint",
    "double",
    "real",
    "text",
    "mediumtext",
    "longtext",
    "tinytext",
    "boolean",
    "blob",
    "longblob",
    "mediumblob",
    "tinyblob",
];
const type2s = [
    "char",
    "varchar",
    "decimal",
    "binary",
];

const normalizeFieldConfig = (fieldConfig) => {
    let config = {type: ["varchar", 255], nullable: true};
    if (fieldConfig.trim() === "") {
        return config;
    }
    const tokens = fieldConfig.split(/\s+/);

    for (const token of tokens) {
        if (token === "uuid") {
            config.type = ["char", 36];
        } else if (~type1s.indexOf(token)) {
            config.type = [token];
        } else if (type2s.find((type) => token.startsWith(type+"("))) {
            const m = /(\w+)\(([\d,]+)\)/.exec(token);
            config.type = [m[1], m[2]];
        } else if (token === "pk") {
            config.primaryKey = true;
            config.nullable = false;
        } else if (token === "auto_increment") {
            config.auto_increment = true;
        } else if (token === "*") {
            config.nullable = false;
        } else if (token.startsWith("fk:")) {
            const [tableName, fieldName] = token.substring("fk:".length).split(".");
            config.fk = {table: tableName, field: fieldName};
        } else if (token.startsWith("rw:")) {
            const faces = token.substring("rw:".length).split("&");
            config.readFaces  = [...config.readFaces || [], ...faces];
            config.writeFaces = [...config.writeFaces || [], ...faces];
        } else if (token.startsWith("w:")) {
            const faces = token.substring("w:".length).split("&");
            config.writeFaces = [...config.writeFaces || [], ...faces];
        } else if (token.startsWith("r:")) {
            const faces = token.substring("r:".length).split("&");
            config.readFaces = [...config.readFaces || [], ...faces];
        } else if (token === "index") {
            config.indices = [...config.indices || [], {}];
        } else if (token === "fulltext") {
            config.fulltext = true;
        } else {
            throw `Unrecognized token: [${token}] in [${fieldConfig}]`;
        }
    }

    if (config.writeFaces && config.primaryKey) {
        throw "Must not set write faces for primary key field: " + fieldConfig;
    }

    return config;
};
