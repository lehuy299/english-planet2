
function sendQuery(query, values, con, ) {
    return new Promise((resolve, reject) => {
        // console.log(query, values)
        // console.log(query)
        con.query(query, values, (err, result) => {
            if (!err) {
                // console.log(result)
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
}
exports.sendQuery = sendQuery;
