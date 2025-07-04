/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/15/2020
 *
 */
// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const { workerServer } = require('./lib/worker');
const { stagingServer } = require('./lib/staging');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    workerServer()
    stagingServer()

};


// start the server
app.createServer();
