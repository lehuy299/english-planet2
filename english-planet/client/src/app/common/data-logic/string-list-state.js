const {listToString} = require("./list-to-string");
const {stringToList} = require("./string-to-list");

const stringListState = (state) => ({
    value: stringToList(state.value),
    onChange: (list) => state.onChange(listToString(list)),
    change: (reducer) => state.change((s) => reducer(s)?.join(",")),
});
exports.stringListState = stringListState;
