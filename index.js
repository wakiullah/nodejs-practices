const express = require('express')

const app = express();
app.get('/about', (req, res) => {
    const oab = new URL(req.url, `http://${req.headers.host}`);

    const detail = Object.fromEntries(oab.searchParams)
    console.log(oab.searchParams);


    res.send('about page')
})

app.listen(3000, () => {
    console.log('app is listening on port 3000');
})

// const myUrl = new URL('https://www.example.com:8080/path/to/resource?name=John&age=30#section-id');
// console.log(myUrl);
