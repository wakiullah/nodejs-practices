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
const { checkHandler } = require('./handlers/tokenHandler/checkHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: authHandler,
    check: checkHandler
};

module.exports = routes;
