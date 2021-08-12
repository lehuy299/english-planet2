const waitTimeout = (delay) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
});
exports.waitTimeout = waitTimeout;
