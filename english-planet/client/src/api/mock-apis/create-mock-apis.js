const {waitTimeout} = require("../../../../../common/utils/wait-timeout");
const {students, classes} = require("./sample-data");

const createMockApis = () => {
    return {
        student: {
            getStudent: async (id) => {
                await waitTimeout(300);
                return students.find((s) => s.id === id);
            },
            getStudentList: async (page) => {
                await waitTimeout(300);
                return students;
            },
        },
        class: {
            getClass: async (id) => {
                await waitTimeout(300);
                return classes.find((s) => s.id === id);
            },
            getClassList: async (page) => {
                await waitTimeout(300);
                return classes;
            },
        }
    };
};
exports.createMockApis = createMockApis;
