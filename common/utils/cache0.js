const cache0 = (fn) => {
    let invoked = false;
    let result = undefined;

    return (...args) => {
        if (!invoked) {
            invoked = true;
            result = fn(...args);
        }
        return result;
    };
};

exports.cache0 = cache0;