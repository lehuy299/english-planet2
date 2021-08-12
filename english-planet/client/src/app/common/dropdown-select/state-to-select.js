const {getPath} = require("../../../../../../common/utils/arr-path");

const stateToSelect = (state, path) => ({
    isSelected: (v) => getPath(v, path) === state.value,
    onChange: (v) => state.onChange(getPath(v, path)),
});
exports.stateToSelect = stateToSelect;
