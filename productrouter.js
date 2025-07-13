const express = require('express')

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
    res.send('this is product page')
})

const productMiddleware = (req, res, next) => {
    res.send('ths is middle ware')
    next()
}

productRouter.use(productMiddleware)


productRouter.get('/hati', (req, res) => {
    res.send('this is hati product page')

})

module.exports = productRouter