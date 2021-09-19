const createUserApis = (fetcher) => ({
    register: ({email, password, username}) => {
        return fetcher.post("/users", {email, password, username});
    },
    login: ({email, password}) => {
        return fetcher.post("/users/login", {email, password});
    },
    updateUser: (user) => {
        return fetcher.put("/user", user);
    },
});
exports.createUserApis = createUserApis;
