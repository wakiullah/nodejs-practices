const utilities = require("../../helpers/utilities")
const lib = require("../../lib/data2")

const handlers = {}



handlers.userHandler = (props, callback) => {
    const methods = ['get', 'delete', 'post', 'put']

    // Handle the request and send a response
    if (methods.indexOf(props.method) > -1) {
        _user[props.method](props, (statusCode, payload) => {
            return callback(statusCode, payload)
        })
    } else {
        const response = {
            message: 'This is a not valid request',
        }
        return callback(405, response)
    }

}

const _user = {}

_user.get = (props, callback) => {
    const number = typeof (props.body.number) === "string" && props.body.number.trim().length === 11 ? props.body.number : false
    console.log('numberss', props);

    if (number) {
        lib.read('users', number, (err, u) => {
            if (!err && u) {
                let data = {};
                try {
                    data = JSON.parse(u);
                } catch (parseErr) {
                    return callback(500, { message: 'Error parsing user data!' });
                }
                // Remove the password from the user object before returning it
                if (data.hasOwnProperty('password')) {
                    delete data.password;
                }
                callback(200, { message: data });
            } else {
                callback(404, {
                    message: 'User not found!'
                })
                
            }
        })
    }

}
_user.delete = (props, callback) => {
    const number = typeof (props.body.number) === "string" && props.body.number.trim().length === 11 ? props.body.number : false

    if (number) {
        lib.read('users', number, (err, data) => {
            if (!err && data) {
                lib.delete('users', number, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'User deleted successfully!'
                        })
                    } else {
                        callback(500, {
                            message: 'Could not delete the user!'
                        })
                    }
                })

            } else {
                return callback(404, {
                    message: 'User not found!'
                })
            }
        })

    } else {
        callback(400, {
            message: 'Invalid TDSF number provided!'
        })
    }

}
_user.post = (props, callback) => {
    console.log('post', props);

    const firstName = typeof (props.body.firstName) === 'string' && props.body.firstName.trim().length > 0 ? props.body.firstName : false

    const lastName = typeof (props.body.lastName) === 'string' && props.body.lastName.trim().length > 0 ? props.body.lastName : false

    const number = typeof (props.body.number) === 'string' && props.body.number.trim().length === 11 ? props.body.number : false

    const password = typeof (props.body.password) === 'string' && props.body.password.trim().length > 6 ? props.body.password : false

    const tosAgreement = typeof (props.body.tosAgreement) === "boolean" ? props.body.tosAgreement : false

    if (firstName && lastName && number && password && tosAgreement) {
        lib.read('users', number, (err, data) => {
            if (!err && data) {
                callback(400, {
                    message: 'User already exists!'
                })
            } else {
                const userObject = {
                    firstName,
                    lastName,
                    number,
                    password: utilities.hashStr(password),
                    tosAgreement
                }

                lib.write('users', number, userObject, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'User created successfully!'
                        })
                    } else {
                        callback(500, {
                            message: 'Could not create the user!'
                        })
                    }
                })

            }
        })
    } else {
        callback(400, {
            message: 'Unable to create File!'
        })
    }
}
_user.put = (props, callback) => {
    console.log('PUT handler called', props.body); // Add this line

    const number = typeof (props.body.number) === "string" && props.body.number.trim().length === 11 ? props.body.number : false
    const password = typeof (props.body.password) === 'string' && props.body.password.trim().length > 6 ? props.body.password : false
    const firstName = typeof (props.body.firstName) === 'string' && props.body.firstName.trim().length > 0 ? props.body.firstName : false

    const lastName = typeof (props.body.lastName) === 'string' && props.body.lastName.trim().length > 0 ? props.body.lastName : false
    console.log('number', number, 'firstName', firstName, 'lastName', lastName, 'password', password);

    if (number) {

        if (firstName || lastName || password) {
            lib.read('users', number, (err, data) => {
                if (!err && data) {
                    let userData = { ...JSON.parse(data) };
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = utilities.hashStr(password);
                    }
                    console.log('userData', userData);

                    lib.update('users', number, userData, (err) => {
                        if (!err) {
                            callback(200, {
                                message: 'User updated successfully!'
                            })
                        } else {
                            callback(500, {
                                message: 'Could not update the user!'
                            })
                        }
                    })
                }
            })
        }


    } else {
        callback(400, {
            message: 'Invalid TDSF  number provided!'
        })
    }
}

module.exports = handlers;