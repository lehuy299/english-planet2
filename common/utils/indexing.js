
const createIndex = (attr) => (col) => {
    let ret = {};
    for (const e of col) {
        ret[e[attr]] = e;
    }
    return ret;
};
exports.createIndex = createIndex;

const cIndexedGetter = (col, attr) => {
    if (col == null) {
        return null;
    }
    const index = createIndex(attr)(col);
    return (id) => index[id];
};
exports.cIndexedGetter = cIndexedGetter;

// const createIndexMulti = (attr) => (col) => {
//     let ret = {};
//     for (const e of col) {
//         let list = ret[e[attr]];
//         if (list == null) {
//             list = [];
//             ret[e[attr]] = list;
//         }
//         list.push(e);
//     }
//
//     return ret;
// };
// exports.createIndexMulti = createIndexMulti;


const createIndexMulti = (col, getKeyList) => {
    let ret = {};
    for (const e of col) {
        let keys = getKeyList(e);
        for (const key of keys) {
            let list = ret[key];
            if (list == null) {
                list = [];
                ret[key] = list;
            }
            list.push(e);
        }
    }
    return ret;
};
exports.createIndexMulti = createIndexMulti;
