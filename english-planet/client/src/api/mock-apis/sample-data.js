
const students = [
    {
        id: "student-1",
        name: "Nguyen Van A",
        classes: [{classId: "class-1"}, {classId: "class-2"}],
    },
    {
        id: "student-2",
        name: "Le Van B",
        classes: [{classId: "class-3"}],
    },
    {
        id: "student-2",
        name: "Le Van B",
        classes: null,
    },
];
exports.students = students;

const classes = [
    {
        id: "class-1",
        name: "IELTS",
    },
    {
        id: "class-2",
        name: "TOEIC",
    },
    {
        id: "class-3",
        name: "PET",
    },
];
exports.classes = classes;
