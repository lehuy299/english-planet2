
const createFetcher = ({token, onUnauthenticated}={}) => {

    const urlModifier = (url) => global.DEV_MODE ? `http://localhost:2912/api${url}` : `http://45.124.95.36:2912/api${url}`;

    let createHeaders = () => {
        let headers = new Headers();
        if (token) {
            headers.append("auth_token", token);
        }
        return headers;
    };

    const readHttpResponse = async (res) => {
        if (res.status === 401) {
            if (onUnauthenticated) {
                onUnauthenticated();
                return await res.json();
            }
            throw await res.json();
        } else {
            return await res.json();
        }
    };

    const withPayload = (method) => async (url, data) => {
        let headers = createHeaders();
        headers.append("Content-Type", "application/json");
        const res = await fetch(urlModifier(url), {
            method,
            body: data == null ? undefined : JSON.stringify(data),
            headers,
        });
        return await readHttpResponse(res);
    };

    const withoutPayload = (method) => async (url) => {
        let headers = createHeaders();
        const res = await fetch(urlModifier(url), {
            method,
            headers
        });
        return await readHttpResponse(res);
    };

    return {
        get: withoutPayload("GET"),
        delete: withoutPayload("DELETE"),
        post: withPayload("POST"),
        put: withPayload("PUT"),
    };
};
exports.createFetcher = createFetcher;
