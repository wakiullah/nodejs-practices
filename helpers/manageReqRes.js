const helpers = {}
const url = require('url');
const { routePath } = require('../routes2');
const { StringDecoder } = require('string_decoder');
const { checkJSONData } = require('./utilities');

helpers.manageReqRes = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const decoder = new StringDecoder('utf-8')

    let bodyData = '';
    let GetInfo = {
        method: req.method.toLowerCase(),
        path: trimmedPath,
    }

    let response = {}
    const chosenHandler = routePath[trimmedPath] ? routePath[trimmedPath] : notFoundHandler;

    req.on('data', (data) => {
        bodyData += decoder.write(data)
        // console.log('data', data);
        // bodyData += data.toString('utf-8');

    })


    req.on('end', () => {
        bodyData += decoder.end()
        GetInfo.body = bodyData;
        console.log('GetInfo', GetInfo);
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