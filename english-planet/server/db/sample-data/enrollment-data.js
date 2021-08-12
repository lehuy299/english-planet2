const {createArray} = require("../../../../common/utils/collections");
const {randomDatetime} = require("./generate-data");
const {numberOfStudents} = require("./student-data");
const {numberOfClasses} = require("./class-data");

const numberOfEnrollment = 25;

const getEnrollmentData = () => {
    let enrollmentMap = {};
    const class_ids = createArray(numberOfClasses).map((c, i) => "class-" + i);

    return createArray(numberOfEnrollment).map((c, i) => {
        const student_id = "student-" + (i < numberOfStudents ? i : i % numberOfStudents);
        let class_id = class_ids[i < numberOfClasses ? i : i % numberOfClasses];

        if (!enrollmentMap[student_id]?.includes(class_id)) {
            enrollmentMap[student_id] = [...(enrollmentMap[student_id] || []), class_id];
        } else {
            class_id = class_ids.filter((cId) => !enrollmentMap[student_id].includes(cId))[0];
        }

        return ({
            id: "enrollment-" + i,
            student_id,
            class_id,
            fee: i % 2 === 0 ? 50000 : null,
            date_start: i % 2 === 0 ? randomDatetime(new Date(2021, 6, 1), new Date(2021, 7, 30)) : null,
            date_end: i % 2 !== 0 ? randomDatetime(new Date(2021, 7, 1), new Date(2021, 8, 30)) : null,
        });
    });
};
exports.getEnrollmentData = getEnrollmentData;
