const cripto = require("crypto");

const utilities = {}


utilities.checkJSONData = (JSONstring) => {

    let output = {};
    try {
        output = JSON.parse(JSONstring)
        console.log('Parsed JSON string successfully:', output);
    } catch (error) {
        output = {}
        console.log('Error parsing JSON string:', error.message);

    }
    return output;
}

utilities.hashStr = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = cripto.createHash('sha256', 'sadfasdfas').update(str).digest('hex');
        return hash;
    }
}

module.exports = utilities