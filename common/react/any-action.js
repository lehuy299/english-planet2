// This service module capture any user click (or scroll) in the window and inform listeners
const {addRemove} = require("../utils/collections");

let anyActionListeners = [];

if (typeof window !== "undefined") {
    window.addEventListener('click', (e)=> {
        anyActionListeners.forEach((l) => l(e));
    });
}
// document.body.addEventListener('scroll', (e)=> {
//     anyActionListeners.forEach((l) => l(e));
// });

const anyAction = addRemove(anyActionListeners);

exports.anyAction = anyAction;
