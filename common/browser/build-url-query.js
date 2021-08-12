
export const buildUrlQuery = (query) => {
    const q = Object.keys(query)
        .filter((k) => query[k] != null)
        .map((key) => key + "=" + encodeURIComponent(query[key]))
        .join("&")
    ;
    return q.length > 0 ? "?"+q : "";
};
