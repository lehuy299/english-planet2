const {getPath, setPath, changePath} = require("../utils/arr-path");

const scope = (state, path) => ({
    value: getPath(state.value, path),
    onChange: (v) => {
        if (state.change) {
            state.change((s1) => setPath(s1, path, v));
        } else {
            state.onChange(setPath(state.value, path, v));
        }
    },
    change: (reduce) => {
        if (state.change) {
            state.change((v) => changePath(v, path, reduce));
        } else {
            state.onChange(changePath(state.value, path, reduce));
        }
    },
});
exports.scope = scope;
