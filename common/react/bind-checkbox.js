const bindCheckbox = ({value, onChange}) => ({
    checked: !!value,
    onClick: () => onChange(!value),
    readOnly: true,
    type: "checkbox",
});
exports.bindCheckbox = bindCheckbox;
