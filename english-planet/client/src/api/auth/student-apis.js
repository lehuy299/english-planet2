
const createStudentApis = (fetcher) => ({
    getStudent: (id) => {
        return fetcher.get(`/student/${id}`);
    },
    getStudents: (page) => {
        // return fetcher.get(`/student?limit=10&offset=${page * 10}`);
        return fetcher.get(`/students`);
    },
    createStudent: (student) => {
        return fetcher.post(`/student`, student);
    },
    upsertStudent: (student) => {
        return fetcher.put(`/student`, student);
    },
    deleteStudent: (id) => {
        return fetcher.delete(`/student/${id}`);
    },
    getEnrollmentsByStudentId: (id) => {
        return fetcher.get(`/student/${id}/enrollments`);
    },
    upsertEnrollments: ({studentId, enrollments}) => {
        return fetcher.put(`/student/${studentId}/enrollments`, enrollments);
    },
    getStudentsHavingUnfinishedPayment: () => {
        return fetcher.get(`/students/unfinished-payment`);
    },
});
exports.createStudentApis = createStudentApis; 
