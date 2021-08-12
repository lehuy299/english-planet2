const {joinArr} = require("./collections");
const {setPathRaw, getPathRaw} = require("./arr-path");

const cache2 = (fn) => {
    let cache = {};

    return ((keyArr) => {
        const path = keyArr.length === 1 ? [keyArr[0]] : joinArr(keyArr, "subs");
        path.push("node");

        let node = getPathRaw(cache, path);
        if (node === undefined) {
            node = {value: fn(keyArr)};
            cache = setPathRaw(cache, path, node);
        }
        return node.value;
    });
};

exports.cache2 = cache2;