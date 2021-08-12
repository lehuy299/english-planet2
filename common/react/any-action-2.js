
const {fragments} = require("./fragments");
const {cs, Invoke} = require("cs-react");
const {OnUnmounted} = require("./on-unmounted");
// This service module capture any user click (or scroll) in the window and inform listeners
const {addRemove} = require("../utils/collections");
const {Static2} = require("./static-2");

let anyActionListeners = [];

if (typeof window !== "undefined") {
    window.addEventListener('click', (e)=> {
        anyActionListeners.forEach((l) => l(e));
    }, true);
}

const anyAction = addRemove(anyActionListeners);

const AnyAction2 = ({getDom, disabled, fn, next}) => cs(
    ["domRef", (_, next) => Static2({next})],
    ["cleanup", (_, next) => Static2({next})],
    ({cleanup, domRef}) => fragments(
        next({
            domRef: domRef.set,
        }),
        Invoke({
            props: {
                disabled, fn,
                getDom: () => getDom?.() ?? domRef.get(),
            },
            action: ({getLatestProps}) => {
                const cleanup1 = anyAction((e) => {
                    const {disabled, getDom, fn} = getLatestProps();
                    if (disabled) {
                        return;
                    }

                    if (getDom()?.contains(e.target)) {
                        // e.stopPropagation();
                        return;
                    }
                    fn(e);
                });
                cleanup.set(cleanup1);
            },
        }),
        OnUnmounted({
            action: () => cleanup.get()?.(),
        }),
    ),
);
exports.AnyAction2 = AnyAction2;

