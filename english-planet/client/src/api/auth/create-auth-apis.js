const {createUserApis} = require("./user-apis");
const {createStudentApis} = require("./student-apis");
const {createClassApis} = require("./class-apis");
const {createTeacherApis} = require("./teacher-apis");
const {createClassDateApis} = require("./class-date-apis");
const {createEnrollmentApis} = require("./enrollment-apis");
const {createReceiptApis} = require("./receipt-apis");
const {createFetcher} = require("../create-fetcher");

const createAuthApis = ({token, onUnauthenticated}) => {
    const fetcher = createFetcher({token, onUnauthenticated});
    return ({
        student: createStudentApis(fetcher),
        class: createClassApis(fetcher),
        teacher: createTeacherApis(fetcher),
        enrollment: createEnrollmentApis(fetcher),
        receipt: createReceiptApis(fetcher),
        classDate: createClassDateApis(fetcher),
        user: createUserApis(fetcher),
    });
};
exports.createAuthApis = createAuthApis;
