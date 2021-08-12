const {Static} = require("./static");

const Static2 = ({getInitValue, next}) => Static({
    getInitValue: () => {
        let value = getInitValue?.();
        return ({
            get: () => value,
            set: (v) => value = v,
        });
    },
    next,
});
exports.Static2 = Static2;
