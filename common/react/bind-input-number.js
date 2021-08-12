const bindInputNumber = ({value, onChange}, {defaultValue}={}) => ({
    value: value ?? defaultValue ?? "",
    onChange: (e) => onChange(!isNaN(e.target.value) ? +e.target.value : null),
});
exports.bindInputNumber = bindInputNumber;
