const {waitTimeout} = require("./wait-timeout");

const waitUntil = async (condition, {timeLimit = 5*60*1000, intervalDelay = 1000}) => {

    const startTime = Date.now();

    for (;;) {

        if (await condition()) {
            return true;
        }

        await waitTimeout(intervalDelay);

        if (Date.now() - startTime > timeLimit) {
            return false;
        }
    }
};
exports.waitUntil = waitUntil;
