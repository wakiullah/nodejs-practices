const { notFoundHandler } = require("./handlers/routesHandlers/notFoundHandler");
const { sampleHandler } = require("./handlers/routesHandlers/sampleHandlers");


const routes = {
    'sample': sampleHandler,
    'notFound': notFoundHandler,
}

module.exports = routes;