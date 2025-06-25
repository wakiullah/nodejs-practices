const { userHandler } = require("./handlers/routesHandlers/userHandler")

const routes = {}


routes.routePath = {
    'user': userHandler
}
module.exports = routes
