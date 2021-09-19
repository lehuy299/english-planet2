const {createFetcher} = require("../create-fetcher");

const createGuestApis = () => {
    const fetcher = createFetcher();
    return {
        login: ({login_name, password}) => fetcher.post(`/user/login`, {login_name, password}),

    }
};
exports.createGuestApis = createGuestApis;
