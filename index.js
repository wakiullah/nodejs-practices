const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { manageRequest } = require('./helpers/handleReqRes');
const { createFile, readFile, updateFile } = require('./lib/data');
//main app configs
const app = {}


// testing file system

updateFile('test', 'newFile', { name: 'test file', address: 'Thakurgaon' }, (err) => {
    if (!err) {
        console.log('File created successfully');
    } else {
        console.log('Error:', err);
    }
});

readFile('test', 'newFile', (err, data) => {
    console.log('Read File Data:', data);

})

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