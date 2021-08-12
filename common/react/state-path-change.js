const {changePath} = require("../utils/arr-path");

const spc = (state, path, change) => {
    if (state.change) {
        state.change((v) => changePath(v, path, change));
    } else {
        state.onChange(changePath(state.value, path, change));
    }
};
exports.spc = spc;
