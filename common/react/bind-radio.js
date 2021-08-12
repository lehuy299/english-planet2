const bindRadio = ({value, onChange}) => ({
    checked: !!value,
    onClick: () => onChange(!value),
    readOnly: true,
    type: "radio",
});
exports.bindRadio = bindRadio;
