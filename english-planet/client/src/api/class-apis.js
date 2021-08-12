
const createClassApis = (fetcher) => ({
    getClass: (id) => {
        return fetcher.get(`/class/${id}`);
    },
    getClasses: (page) => {
        //return fetcher.get(`/class?limit=10&offset=${page * 10}`);
        return fetcher.get(`/classes`);
    },
    createClass: (class1) => {
        return fetcher.post(`/class`, class1);
    },
    upsertClass: (class1) => {
        return fetcher.put(`/class`, class1);
    },
    deleteClass: (id) => {
        return fetcher.delete(`/class/${id}`);
    },
});
exports.createClassApis = createClassApis;
