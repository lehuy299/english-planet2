const {setPath} = require("../utils/arr-path");

const sps = (state, path, newValue) => state.onChange(setPath(state.value, path, newValue));
exports.sps = sps;
