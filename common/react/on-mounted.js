const React = require("react");
const {createElement: h} = require("react");

const OnMounted = ({action, props, next}) => h(OnMounted1, {action, props, next});
exports.OnMounted = OnMounted;

class OnMounted1 extends React.Component {
    componentDidMount() {
        this.props.action({
            getLatestProps: () => this.props.props,
        });
    }

    render() {
        const {next} = this.props;
        return next ? next() : null;
    }
}