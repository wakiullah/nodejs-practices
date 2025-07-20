import e from "express";
import mongoose from "mongoose";
const app = e()



app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3000, () => {
    console.log('app is running');

})