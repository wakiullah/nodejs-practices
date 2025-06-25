const helpers = {}
const url = require('url');
const { routePath } = require('../routes2');
const { StringDecoder } = require('string_decoder');

helpers.manageReqRes = (req, res) => {
    const decoder = new StringDecoder('utf-8');
    let bodyData = '';

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    let GetInfo = {
        method: req.method.toLowerCase(),
        path: trimmedPath,
    }

    const chosenHandler = routePath[trimmedPath] ? routePath[trimmedPath] : notFoundHandler;

    req.on('data', (data) => {
        bodyData += decoder.write(data);
    });


    req.on('end', () => {
        bodyData += decoder.end();
        try {
            GetInfo.body = JSON.parse(bodyData);
        } catch (e) {
            GetInfo.body = {};
        }
        chosenHandler(GetInfo, (statusCode, payload) => {
            const payloadString = JSON.stringify(payload);
            statusCode = typeof (statusCode) === 'number' ? statusCode : 200
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    })

}
module.exports = helpers;