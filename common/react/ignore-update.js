const {Component, createElement: h} = require("react");

const IgnoreUpdate = ({next, props, when, onRender, unless}) => h(IgnoreUpdate1, {next, props, when, onRender, unless});
exports.IgnoreUpdate = IgnoreUpdate;

class IgnoreUpdate1 extends Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.when != null && !nextProps.when(this.props.props)) || (nextProps.unless != null && !!nextProps.unless(this.props.props));
    }

    render() {
        const {next, onRender} = this.props;
        onRender?.();
        return next?.() ?? null;
    }
}
