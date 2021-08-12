
const parseUrlQuery = (search) => {
    if (search == null || search === "" || search[0] !== "?") {
        return null;
    }

    search = search.substring(1);

    const ret = {};
    search.split("&").map((pair) => {
        const [name, encodedValue] = pair.split("=");
        ret[name] = decodeURIComponent(encodedValue);
    });
    return ret;
};
exports.parseUrlQuery = parseUrlQuery;