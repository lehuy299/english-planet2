const {OnUnmounted} = require("./on-unmounted");
const {fragments} = require("./fragments");
const {Static2} = require("./static-2");
const {cs, Invoke} = require("cs-react");

const GlobalEvent = ({eventName, fn, next}) => cs(
    ["listener", (_, next) => Static2({next})],
    ({listener}) => fragments(
        Invoke({
            props: {fn},
            action: ({getLatestProps}) => {
                const listener1 = (e) => {
                    const {fn} = getLatestProps();
                    fn(e);
                };
                window.addEventListener(eventName, listener1);
                listener.set(listener1);
            },
        }),
        OnUnmounted({
            action: () => {
                const l1 = listener.get();
                if (l1) {
                    window.removeEventListener(eventName, l1);
                }
            },
        }),
        next?.(),
    ),
);
exports.GlobalEvent = GlobalEvent;
