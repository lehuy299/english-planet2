const {cascadeChange} = require("../utils/cascade");

const scc = (state, pattern, change) => {
    if (state.change) {
        state.change((v) => cascadeChange(v, pattern, change));
    } else {
        state.onChange(cascadeChange(state.value, pattern, change));
    }
};
exports.scc = scc;
