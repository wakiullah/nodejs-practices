/*
 * Title: Routes
 * Description: Application Routes
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/15/2020
 *
 */
// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');
const { authHandler } = require('./handlers/tokenHandler/authHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: authHandler
};

module.exports = routes;
