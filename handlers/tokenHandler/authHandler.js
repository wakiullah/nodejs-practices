const { hash, randonToken } = require("../../helpers/utilities");
const lib = require("../../lib/data");

const handlers = {}

handlers.authHandler = (requestProperties, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(requestProperties.method) > -1) {
        handlers._auth[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handlers._auth = {};


handlers._auth.post = (requestProperties, callback) => {

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
                const tokenValues = {
                    phone,
                    expireToken,
                    token: randonToken(8)
                }


                lib.create('token', phone, tokenValues, (err, data) => {
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
handlers._auth.get = (requestProperties, callback) => {
    // check the phone number if valid

    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    if (phone) {
        // lookup the user
        data.read('users', phone, (err, u) => {
            const user = { ...parseJSON(u) };
            if (!err && user) {
                delete user.password;
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
handlers._auth.put = (requestProperties, callback) => {
    // check the phone number if valid
    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
            requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
            requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
            requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;


};

// @TODO: Authentication
handlers._auth.delete = (requestProperties, callback) => {
    // check the phone number if valid
    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;
};


module.exports = handlers;