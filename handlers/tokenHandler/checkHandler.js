const { hash, randonToken, parseJSON } = require("../../helpers/utilities");
const lib = require("../../lib/data");
const authhandlers = require('../tokenHandler/authHandler')

const handlers = {}

handlers.checkHandler = (requestProperties, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(requestProperties.method) > -1) {
        handlers._check[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handlers._check = {};


handlers._check.post = (requestProperties, callback) => {
    const protocol = typeof (requestProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false

    const method = typeof (requestProperties.body.method) === 'string' && ['get', 'post', "put", 'delete'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false

    const url = typeof (requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false

    const sucessCode = typeof (requestProperties.body.sucessCode) === 'object' && requestProperties.body.sucessCode instanceof Array ? requestProperties.body.sucessCode : false


    const timeOutSeconds = typeof (requestProperties.body.timeOutSeconds) === 'number' && requestProperties.body.timeOutSeconds % 1 === 0 && requestProperties.body.timeOutSeconds >= 1 && requestProperties.body.timeOutSeconds <= 5 ? requestProperties.body.sucessCode : false

    const token =
        typeof requestProperties.headersObject.token === 'string'
            ? requestProperties.headersObject.token
            : false;

    if (protocol && method && url && sucessCode && timeOutSeconds) {
        lib.read('token', token, (err, tokenData) => {
            const phone = parseJSON(tokenData).phone
            if (!err && phone) {
                lib.read('users', phone, (err1, user) => {

                    if (!err1 && user) {
                        authhandlers._token.checker(token, phone, (isValidToken) => {
                            if (isValidToken) {
                                let userObject = parseJSON(user)
                                let userChecks = typeof (userObject.checks) === "object" && userObject.checks instanceof Array ? userObject.checks : []

                                if (userChecks.length < 5) {
                                    let checkId = randonToken(15);
                                    let checkObject = {
                                        id: checkId,
                                        userPhone: phone,
                                        protocol,
                                        url,
                                        method,
                                        sucessCode,
                                        timeOutSeconds
                                    }

                                    lib.create('checks', checkId, checkObject, (err2) => {
                                        if (!err2) {
                                            userObject.checks = userChecks;
                                            userObject.checks.push(checkId)

                                            lib.update('users', phone, userObject, (err4) => {
                                                if (!err4) {
                                                    callback(200, checkObject)
                                                }
                                            })

                                        } else {
                                            callback(404, {
                                                err: "Check Create faild"
                                            })
                                        }
                                    })

                                } else {
                                    callback(404, {
                                        err: "User cross max checks limit"
                                    })
                                }

                            } else {
                                callback(404, {
                                    err: "authentication Problem"
                                })
                            }

                        })

                    } else {
                        callback(404, {
                            err: "There was a users problem"
                        })
                    }
                })
            } else {
                callback(404, {
                    err: "There was a authentication problem"
                })
            }
        })

    } else {
        callback(400, {
            err: "the is some invalid data"
        })
    }

};

// @TODO: Authentication
handlers._check.get = (requestProperties, callback) => {
    const checkId = typeof (requestProperties.body.checkId) === "string" && requestProperties.body.checkId.trim().length > 0 ? requestProperties.body.checkId : false

    if (checkId) {

        lib.read('checks', checkId, (err, checkData) => {
            const token = typeof (requestProperties.headersObject.token) === "string" && requestProperties.headersObject.token.trim().length > 0 ? requestProperties.headersObject.token : false
            if (!err && checkData) {
                let ab = parseJSON(checkData)
                console.log(ab);

                authhandlers._token.checker(token, parseJSON(checkData).userPhone, (IsTokenValid) => {
                    if (IsTokenValid) {
                        callback(200, parseJSON(checkData))

                    } else {
                        callback(404, {
                            err: "INvalid TOken"
                        })
                    }
                })
            } else {
                callback(404, {
                    err: "problem from server"
                })
            }

        })

    } else {
        callback(404, {
            err: "invalid CheckID"
        })
    }

};

// @TODO: Authentication
handlers._check.put = (requestProperties, callback) => {
    const checkId = typeof (requestProperties.body.checkId) === "string" && requestProperties.body.checkId.trim().length > 0 ? requestProperties.body.checkId : false
    const mainProtocals = ['http', 'https']


    if (checkId) {

        lib.read('checks', checkId, (err, checkData) => {
            const token = typeof (requestProperties.headersObject.token) === "string" && requestProperties.headersObject.token.trim().length > 0 ? requestProperties.headersObject.token : false
            const protocol = typeof (requestProperties.body.protocol) === "object" && mainProtocals.indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;
            const url = typeof (requestProperties.body.url) === "string" ? requestProperties.body.url : false;

            if (!err && checkData) {
                authhandlers._token.checker(token, parseJSON(checkData).userPhone, (IsTokenValid) => {
                    if (IsTokenValid) {
                        let cloneCheckData = { ...parseJSON(checkData) }
                        if (protocol || url) {
                            if (protocol) {
                                cloneCheckData.protocol = protocol
                            }
                            if (url) {
                                cloneCheckData.url = url
                            }

                            lib.update('checks', checkId, cloneCheckData, (err) => {
                                if (!err) {
                                    callback(200, {
                                        message: "Check Update Sucessful"
                                    })
                                } else {
                                    callback(399, {
                                        err: "check update sucessful"
                                    })
                                }
                            })

                        } else {
                            callback(292, {
                                err: "please add valid protocol or url"
                            })
                        }
                    } else {
                        callback(404, {
                            err: "INvalid TOken"
                        })
                    }
                })
            } else {
                callback(404, {
                    err: "problem from server"
                })
            }

        })

    } else {
        callback(404, {
            err: "invalid CheckID"
        })
    }

};

// @TODO: Authentication
handlers._check.delete = (requestProperties, callback) => {

};


module.exports = handlers;