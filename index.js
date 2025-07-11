const express = require('express')

const app = express();
app.use(express.json())

const backend = express()

backend.get('/dahsboard', (req, res) => {
    res.send("this is backend dashboard")
})

app.post('/hello/:id', (req, res) => {
    console.log(req.params.id);

    res.send('dthis is get')

})
app.use('/backend', backend)


app.listen(3000, () => {
    console.log('app is listening on port 3000');

})