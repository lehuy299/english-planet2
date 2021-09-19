const {encryptPassword} = require("../../../../common/server/encrypt-password");

const getUserData = async () => {
    const adminPassword = await encryptPassword("admin");
    const huyPassword = await encryptPassword("huy");
    const luanPassword = await encryptPassword("luan");

    return [
        {
            id: "user-0",
            login_name: "admin",
            full_name: "admin",
            password: adminPassword,
            role: "admin",
        },
        {
            id: "user-1",
            login_name: "huy",
            full_name: "Tran Huu Le Huy",
            password: huyPassword,
            role: "user",
        },
        {
            id: "user-2",
            login_name: "luan",
            full_name: "Duong Phuoc Luan",
            password: luanPassword,
            role: "user",
        }
    ];
};
exports.getUserData = getUserData;
