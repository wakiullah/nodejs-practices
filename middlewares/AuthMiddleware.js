const jwt = require('jsonwebtoken')

const AuthMiddleWare = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const jwToken = authorization.split(' ')[1]
        const decoded = jwt.verify(jwToken, 'alskdjsadfasdf')
        req.body.userName = decoded.userName
        next()
    } catch (error) {
        next('Authintication Faild!')
    }
}


module.exports = AuthMiddleWare