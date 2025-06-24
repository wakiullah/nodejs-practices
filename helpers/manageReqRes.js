const helpers = {}
const url = require('url');
helpers.manageReqRes = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'Node.js',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': 'sessionid=abc123; HttpOnly'
    });

    res.end('<h1>Hello, World!</h1>');

}
module.exports = helpers;  