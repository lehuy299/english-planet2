const {createArray} = require("../../../../common/utils/collections");
const {randomDatetime} = require("./generate-data");

const classNames = ["PET", "IELTS", "TOEIC", "KID", "FLY"];

const numberOfClasses = classNames.length;
exports.numberOfClasses = numberOfClasses;

const getClassData = () => {
    return createArray(numberOfClasses).map((c, i) => ({
        id: "class-" + i,
        name: classNames[i],
        room: `${i + 1}`,
        fee: 100000,
        teacher_id: "teacher-" + i,
        days_of_week: i % 2 === 0 ? "2,4,6" : "3,5,7",
        date_start: randomDatetime(new Date(2021, 5, 1), new Date(2021, 6, 30)),
        date_end: randomDatetime(new Date(2021, 8, 1), new Date(2021, 9, 30)),
        time: 8 + i + 2,
        class_dates_generated: false,
        inactive: false,
    }));
};
exports.getClassData = getClassData;
