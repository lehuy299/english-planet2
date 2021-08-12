const {createArray} = require("../../../../common/utils/collections");
const {randomPhoneNumber, randomName} = require("./generate-data");

const numberOfTeachers = 5;

const getTeacherData = () => {
    return createArray(numberOfTeachers).map((t, i) => ({
        id: "teacher-" + i,
        name: "T. " + randomName(),
        phone_number: randomPhoneNumber(),
        inactive: false,
    }));
};
exports.getTeacherData = getTeacherData;
