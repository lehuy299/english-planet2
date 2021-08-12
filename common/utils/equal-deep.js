
function equalDeep(o1, o2) {
    if (o1 === o2) {
        return true;
    }

    if (o1 == null && o2 == null) {
        return false;
    }

    if (o1 == null || o2 == null) {
        return false;
    }

    if (typeof o1 === "object" && typeof o2 === "object") {
        for (const k in o1) {
            if (!equalDeep(o1[k], o2[k])) {
                return false;
            }
        }
        for (const k in o2) {
            if (o1[k] === undefined && o2[k] !== undefined) {
                return false;
            }
        }
        return true;
    }

    return false;
}
exports.equalDeep = equalDeep;
exports.equalDeep1 = equalDeep;
