
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const handler = {}

handler.manageRequest = (req, res) => {
    const parserdUrl = url.parse(req.url, true);
    const path = parserdUrl.pathname.replace(/^\/+|\/+$/g, '');
    const decoder = new StringDecoder('utf-8');

    let buffer = '';
    const ourDataObject = {
        'path': path,
        'query': parserdUrl.query,
        'method': req.method.toLowerCase(),
        'headers': req.headers,
    }

    const chooseHandler = routes[path] ? routes[path] : routes['notFound'];
    chooseHandler(ourDataObject, (statusCode, payload) => {

        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        // return the final response
        res.writeHead(statusCode);
        res.end(payloadString);
    })

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        console.log('Request received:')
        res.end(buffer)
    })
}

module.exports = handler;