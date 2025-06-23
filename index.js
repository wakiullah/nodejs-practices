const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { manageRequest } = require('./helpers/handleReqRes');
//main app configs
const app = {}

app.config = {
    'port': 3000,
}

app.createServer = () => {
    const server = http.createServer(app.manageRequest);

    server.listen(app.config.port, () => {
        console.log(`Server is running on port ${app.config.port}`);
    });

}
app.manageRequest = manageRequest;

app.createServer();