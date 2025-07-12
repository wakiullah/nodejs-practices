const express = require('express')

const app = express();
app.use(express.json())

const backend = express()
app.set('view engine', 'ejs')
backend.get('/dashboard', (req, res) => { // fixed typo
    res.send("this is backend dashboard")
})

app.post('/hello/:id', (req, res) => {
    console.log(req.params.id);
    res.send('this is post') // fixed response message
})
app.use('/backend', backend)

app.get('/about', (req, res) => {
    res.render('pages/about') // fixed render path
})

app.listen(3000, () => {
    console.log('app is listening on port 3000');
})