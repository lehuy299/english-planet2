const {createElement: h, Component} = require("react");

const Static = ({getInitValue, initValue, props, next}) => h(Static1, {getInitValue, initValue, props, next});
exports.Static = Static;

class Static1 extends Component {

    constructor(props, context) {
        super(props, context);

        this.value = props.getInitValue ? props.getInitValue({
            getLatestProps: () => this.props.props,
        }) : props.initValue !== undefined ? props.initValue : props.value;
    }
    render() {
        const {next} = this.props;

        return next(this.value);
    }
}
