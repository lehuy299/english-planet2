const {getPath} = require("../../../../../../common/utils/arr-path");

const stateToCheckboxLineGroup = (state, path) => {
    const isSelected = (v) => state.value && state.value.includes(v);
    return ({
        isSelected: (item) => isSelected(getPath(item, path)),
        onChange: (item) => {
            const v = getPath(item, path);
            if (isSelected(v)) {
                state.onChange(state.value.filter((v1) => v1 !== v));
            } else {
                state.onChange([
                    ...state.value||[],
                    v,
                ]);
            }
        },
    });
};
exports.stateToCheckboxLineGroup = stateToCheckboxLineGroup;
