import e from "express";
import mongoose from "mongoose";
const todoHandler = require('./routeHandler/TodoHandler')
const app = e()

mongoose.connect('mongodb://localhost/todos', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('connected')
    )
    .catch((err) => console.log(err)
    )

app.get('/', todoHandler)

app.listen(3000, () => {
    console.log('app is running');

})