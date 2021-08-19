const {buildUrlQuery} = require("../../../../common/browser/build-url-query");

const createEnrollmentApis = (fetcher) => ({
    getEnrollment: (id) => {
        return fetcher.get(`/enrollment/${id}`);
    },
    getEnrollments: ({studentId, classId}) => {
        return fetcher.get(`/enrollments${buildUrlQuery({student_id: studentId, class_id: classId})}`);
    },
    upsertEnrollment: (enrollment) => {
        return fetcher.put(`/enrollment`, enrollment);
    },
    getReceipts: (enrollmentId) => {
        return fetcher.get(`/enrollments/${enrollmentId}/receipts`);
    },
    deleteEnrollment: (id) => {
        return fetcher.delete(`/enrollment/${id}`);
    },
});
exports.createEnrollmentApis = createEnrollmentApis;