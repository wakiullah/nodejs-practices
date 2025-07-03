/*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/21/2020
 *
 */

// dependencies

// module scaffolding
const crypto = require('crypto');

const utilities = {};
const environments = require('./environments');

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

// hash string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        console.log(environments, process.env.NODE_ENV);
        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
        return hash;
    }
    return false;
};


utilities.randonToken = (length) => {
    const totalLength = typeof (length) === "number" && length > 6 ? length : false
    if (totalLength) {
        let token = '';
        const charectures = 'abcdefghijklmnopqrstuvwxyz123456789';
        for (let i = 0; i <= length; i++) {
            const random = charectures.charAt(Math.floor(Math.random() * charectures.length))
            token += random
        }

        return token
    }
}

// export module
module.exports = utilities;
