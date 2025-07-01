const { hash, randonToken, parseJSON } = require("../../helpers/utilities");
const lib = require("../../lib/data");

const handlers = {}

handlers.authHandler = (requestProperties, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(requestProperties.method) > -1) {
        handlers._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handlers._token = {};


handlers._token.post = (requestProperties, callback) => {

    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
            requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if (phone && password) {
        lib.read('users', phone, (err, data) => {
            const hashesPasword = hash(password)

            const userData = JSON.parse(data)

            if (hashesPasword === userData.password) {
                const expireToken = Date.now() + 60 * 60 * 1000;
                const token = randonToken(8)
                const tokenValues = {
                    phone,
                    expireToken,
                    token
                }


                lib.create('token', token, tokenValues, (err, data) => {
                    if (!err) {
                        callback(200, {
                            message: 'Token create successful!',
                        });
                    } else {
                        callback(404, {
                            error: 'Token not crated!',
                        });
                    }
                })
            }
        })
    } else {
        callback(404, {
            error: 'Provide a valid number!',
        });
    }


};

// @TODO: Authentication
handlers._token.get = (requestProperties, callback) => {
    // check the phone number if valid
    const token =
        typeof requestProperties.body.token === 'string'
            ? requestProperties.body.token
            : false;

    if (token) {
        // lookup the user
        lib.read('token', token, (err, u) => {
            const user = { ...parseJSON(u) };
            if (!err && user) {
                callback(200, user);
            } else {
                callback(404, {
                    error: 'Requested user was not found!',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested user was not found!',
        });
    }
};

// @TODO: Authentication
handlers._token.put = (requestProperties, callback) => {
    // check the phone number if valid
    const token =
        typeof requestProperties.headersObject.token === 'string'
            ? requestProperties.headersObject.token
            : false;

    if (token) {
        // lookup the user
        lib.read('token', token, (err, u) => {
            const user = { ...parseJSON(u) };
            if (!err && user && token === user.token) {
                user.expireToken = Date.now() + 60 * 60 * 1000
                lib.update('token', token, user, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'Token Expended! '
                        })
                    } else {
                        callback(300, {
                            err: 'Token expend fail'
                        })
                    }
                })

            } else {
                callback(404, {
                    error: 'Requested user was not found!',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested user was not found!',
        });
    }


};

// @TODO: Authentication
handlers._token.delete = (requestProperties, callback) => {
    // check the phone number if valid
    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;
};

handlers._token.checker = (token, number, callback) => {
    if (typeof (token) === "string" && token.length > 6) {
        lib.read('token', token, (err, data) => {
            const user = { ...parseJSON(data) };

            if (user.token === token && user.phone === number) {
                callback(true)
            } else {
                callback(false)
            }
        })
    }

}

module.exports = handlers;