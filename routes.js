const { notFoundHandler } = require("./handlers/routesHandlers/notFoundHandler");
const { sampleHandler } = require("./handlers/routesHandlers/sampleHandlers");
const { userHandler } = require("./handlers/routesHandlers/userHandler");


const routes = {
    'sample': sampleHandler,
    'notFound': notFoundHandler,
    'user': userHandler
}

module.exports = routes;