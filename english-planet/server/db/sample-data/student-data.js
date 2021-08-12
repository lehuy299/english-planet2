const {createArray} = require("../../../../common/utils/collections");
const {randomPhoneNumber, randomName, randomDatetime} = require("./generate-data");

const numberOfStudents = 20;
exports.numberOfStudents = numberOfStudents;

const getStudentData = () => {
    return createArray(numberOfStudents).map((s, i) => ({
        id: "student-" + i,
        name: randomName(),
        date_of_birth: randomDatetime(new Date(2004, 0, 1), new Date(2007, 11, 31)),
        phone_number: randomPhoneNumber(),
        inactive: false,
    }));
};
exports.getStudentData = getStudentData;
