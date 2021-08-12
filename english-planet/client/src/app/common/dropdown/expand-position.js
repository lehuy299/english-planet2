const {cs} = require("cs-react");

const ExpandPosition = ({next, minHeight, dom, forcedLeft, forcedBottom}) => cs(
    () => {
        const rect = dom.getBoundingClientRect();
        const ww = window.innerWidth;
        const wh = window.innerHeight;

        return next({
            width: rect.width,
            ...!forcedBottom && minHeight && wh - (rect.y + rect.height) < minHeight ? {
                bottom: wh - rect.y,
            } : {
                top: rect.y + rect.height,
            },

            ...forcedLeft || rect.x < ww - (rect.x + rect.width) ? {
                left: rect.x,
            } : {
                right: ww - (rect.x + rect.width),
            },
            maxHeight: forcedBottom ? (wh - (rect.y + rect.height)) - 40 : null
        });
    },
);
exports.ExpandPosition = ExpandPosition;
