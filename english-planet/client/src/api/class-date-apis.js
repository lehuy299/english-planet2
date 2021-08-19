const {serializeDate} = require("../../../../common/utils/date-object");

const createClassDateApis = (fetcher) => ({
    getClassDate: (id) => {
        return fetcher.get(`/class-date/${id}`);
    },
    getClassDatesInDateRange: (dateRange) => {
        const from = serializeDate(dateRange.from);
        const to = serializeDate(dateRange.to);
        return fetcher.get(`/class-dates?from=${from}&to=${to}`);
    },
    getClassDatesOfClass: (classId) => {
        return fetcher.get(`/class-dates/class/${classId}`);
    },
    createClassDates: (classDates) => {
        return fetcher.post(`/class-dates`, classDates);
    },
    upsertClassDate: (classDate) => {
        return fetcher.put(`/class-date`, classDate);
    },
    deleteClassDate: (id) => {
        return fetcher.delete(`/class-date/${id}`);
    },
    deleteClassDatesOfClass: (classId) => {
        return fetcher.delete(`/class-dates/class/${classId}`);
    },
});
exports.createClassDateApis = createClassDateApis;
