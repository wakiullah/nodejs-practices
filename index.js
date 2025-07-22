const e = require("express");
const mongoose = require("mongoose");
const todoHandler = require('./routeHandler/TodoHandler')
const app = e()
app.use(e.json())


mongoose.connect('mongodb://localhost/todos', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('connected')
    )
    .catch((err) => console.log(err)
    )

app.use('/todo', todoHandler)


app.listen(3000, () => {
    console.log('app is running');

})