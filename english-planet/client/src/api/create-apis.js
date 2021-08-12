const {createUserApis} = require("./user-apis");
const {createStudentApis} = require("./student-apis");
const {createClassApis} = require("./class-apis");
const {createTeacherApis} = require("./teacher-apis");
const {createClassDateApis} = require("./class-date-apis");
const {createEnrollmentApis} = require("./enrollment-apis");
const {createReceiptApis} = require("./receipt-apis");

const createApis = (token) => {
    const fetcher = createFetcher(token);
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
exports.createApis = createApis;


const createFetcher = (token) => {

    const urlModifier = (url) => `http://localhost:2912/api${url}`;

    let createHeaders = () => {
        let headers = new Headers();
        if (token) {
            headers.append("authorization", `Token ${token}`);
        }
        return headers;
    };

    const withPayload = (method) => (url, data) => {
        let headers = createHeaders();
        headers.append("Content-Type", "application/json");
        return fetch(urlModifier(url), {
            method,
            body: data == null ? undefined : JSON.stringify(data),
            headers,
        }).then((response) => response.json());
    };

    const withoutPayload = (method) => (url) => {
        let headers = createHeaders();
        return fetch(urlModifier(url), {
            method,
            headers
        }).then((response) => response.json());
    };

    return {
        get: withoutPayload("GET"),
        delete: withoutPayload("DELETE"),
        post: withPayload("POST"),
        put: withPayload("PUT"),
    };
};
exports.createFetcher = createFetcher;
