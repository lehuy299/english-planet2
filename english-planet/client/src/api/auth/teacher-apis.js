
const createTeacherApis = (fetcher) => ({
    getTeacher: (id) => {
        return fetcher.get(`/teacher/${id}`);
    },
    getTeachers: (page) => {
        // return fetcher.get(`/teacher?limit=10&offset=${page * 10}`);
        return fetcher.get(`/teachers`);
    },
    createTeacher: (teacher) => {
        return fetcher.post(`/teacher`, teacher);
    },
    updateTeacher: (teacher) => {
        return fetcher.put(`/teacher/${teacher.id}`, teacher);
    },
    deleteTeacher: (id) => {
        return fetcher.delete(`/teacher/${id}`);
    },
    upsertTeacher: (teacher) => {
        return fetcher.put(`/teacher`, teacher);
    },
});
exports.createTeacherApis = createTeacherApis; 
