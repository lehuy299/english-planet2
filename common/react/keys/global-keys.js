const remove1Mutate = require("../../utils/collections").remove1Mutate;
const listeners = [];

const listener = (e) => {
    for (let i = listeners.length - 1; i > -1; i--) {
        const listener = listeners[i];

        if (listener.check(e)) {
            listener.invoke(e);
            if (listener.preventDefault) {
                e.preventDefault();
            }
            e.stopPropagation();
            return;
        }
    }
};
window.addEventListener("keydown", listener);

const globalKeys = {
    onKeyDown: (check, invoke, {preventDefault=true}={}) => {

        const listener = {check, invoke, preventDefault};
        listeners.push(listener);
        return () => remove1Mutate(listeners, listener);
    },
    onKeyHold: (check, invoke) => {
        let invoking = false;
        const listener = {
            check,
            preventDefault: true,
            invoke: (e) => {
                if (invoking) {
                    return;
                }
                const stop = invoke(e);
                invoking = true;
                const stopListener = (e) => {
                    invoking = false;
                    stop(e);
                    window.removeEventListener("keyup", stopListener);
                };
                window.addEventListener("keyup", stopListener);
            },
        };
        listeners.push(listener);
        return () => remove1Mutate(listeners, listener);
    },
};
exports.globalKeys = globalKeys;