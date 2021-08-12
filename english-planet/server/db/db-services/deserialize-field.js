const {parseDate} = require("../../../../common/utils/date-object");
const {arrMapToO} = require("../../../../common/utils/objects");

const f1 = v=>v;

const map = {
    "boolean": (v) => !!v,
    "date": parseDate,
    // "json": (v) => JSON.parse(v), // for mysql lib (vs mysql2)
    "decimal": (n) => n==null ? n : +n,
    "timestamp": (v) => v && v.getTime(),
};

const deserializeField = (field) => {
    return map[field.type[0]] || f1;
};
exports.deserializeField = deserializeField;

const cDeserialize = (tableConfig) => (record) => {
    const fieldNames = Object.keys(tableConfig.fields);
    const deserializeF = (fieldName) => deserializeField(tableConfig.fields[fieldName])(record[fieldName]);
    return arrMapToO(fieldNames, deserializeF);
};
exports.cDeserialize = cDeserialize;

const cRecordsDeserialize = (deserialize) => (records) => records.map(deserialize);
exports.cRecordsDeserialize = cRecordsDeserialize;