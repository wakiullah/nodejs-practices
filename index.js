const express = require('express')

const app = express();

app.use(express.json())


app.post('/', (req, res) => {
    console.log(req.body.name);
    res.send('dthis is get')

})



app.listen(3000, () => {
    console.log('app is listening on port 3000');

})