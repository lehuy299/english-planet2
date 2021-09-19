module.exports = {
    name: "user",
    fields: {
        id: "uuid",
        login_name: "*",
        full_name: "*",
        password: "char(128)",
        role: "*", // admin, user
        // inactive: "boolean",
    },
};
