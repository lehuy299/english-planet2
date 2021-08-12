const {toDate} = require("../../../../common/utils/date-object");
const {arrMapToO} = require("../../../../common/utils/objects");

const serializeField = (field) => (value) => {
    if (field.type[0] === "boolean") {
        return !!value;
    }

    if (value == null) {
        return null;
    }

    if (field.type[0] === "json") {
        return JSON.stringify(value);
    }

    if (field.type[0] === "date") {
        return toDate(value);
    } 

    if (field.type[0] === "timestamp") {
        return new Date(value);
    }

    return value;
};
exports.serializeField = serializeField;

const cSerialize = (tableConfig) => (record) => {
    const fieldNames = Object.keys(tableConfig.fields);
    const setNames = fieldNames.filter((name) => {
        const field = tableConfig.fields[name];
        return !field.primaryKey;
    });
    const serializeF = (fieldName) => serializeField(tableConfig.fields[fieldName])(record[fieldName]);
    return arrMapToO(setNames, serializeF);
};
exports.cSerialize = cSerialize;
