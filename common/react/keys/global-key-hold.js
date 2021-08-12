const React = require("react");
const {FComponent} = require("../f-component");
const {and} = require("../../utils/fs");
const {keyCombo} = require("./key-combo");
const {globalKeys} = require("./global-keys");

class GlobalKeyHold extends FComponent {
    constructor(props, context) {
        super(props, context);

        this.onUnmount(globalKeys.onKeyHold(and(() => !this.props.disabled, keyCombo(props.keyCombo)), (e) => {
            return this.props.onKeyHold(e);
        }));
    }


    render() {
        const {next} = this.props;

        return next();
    }
}
exports.GlobalKeyHold = GlobalKeyHold;