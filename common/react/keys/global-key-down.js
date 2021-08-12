const {FComponent} = require("../f-component");
const {and} = require("../../utils/fs");
const {keyCombo} = require("./key-combo");
const {globalKeys} = require("./global-keys");
const {createElement: h} = require("react");

const GlobalKeyDown = ({disabled, keyCombo, onKeyDown, preventDefault, next}) => h(GlobalKeyDown1, {
    disabled, keyCombo, onKeyDown, preventDefault, next
});
exports.GlobalKeyDown = GlobalKeyDown;

class GlobalKeyDown1 extends FComponent {
    constructor(props, context) {
        super(props, context);

        this.onUnmount(globalKeys.onKeyDown(
            and(() => !this.props.disabled, keyCombo(props.keyCombo)),
            (e) => this.props.onKeyDown(e),
            {preventDefault: props.preventDefault === undefined ? true : props.preventDefault},
        ));
    }


    render() {
        const {next} = this.props;

        return next ? next() : null;
    }
}
