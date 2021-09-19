const jwt = require('jsonwebtoken');

const signResetPassword = (email) => new Promise((resolve, reject) => {
    jwt.sign({email}, "fj3498weg", {expiresIn: "24h"}, function(err, token) {
        resolve(token);
    });
});

(async () => {

    console.log(await signResetPassword("aaa@fr.com"));
})()