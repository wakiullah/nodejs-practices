const express = require('express')

const app = express();

const backend = express()

backend.get('/dahsboard', (req, res) => {
    res.send("this is backend dashboard")
})

app.get('/', (req, res) => {
    res.send('dthis is get')

})
app.use('/backend', backend)


app.listen(3000, () => {
    console.log('app is listening on port 3000');

})