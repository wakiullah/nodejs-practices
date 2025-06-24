const http = require('http');
const helpers = require('./helpers/manageReqRes');
const app = {}
app.config = {
    port: 5000,
}

app.createServer = () => {
    const server = http.createServer(app.manageRequest);

    server.listen(app.config.port, () => {
        console.log(`Server is running on port ${app.config.port}`);
    })
}

app.manageRequest = helpers.manageReqRes

app.createServer()