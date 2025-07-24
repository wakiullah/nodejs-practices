const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requird: true
    },
    userName: {
        type: String,
        requird: true
    },
    password: {
        type: String,
        requird: true
    },
    statue: {
        type: String,
        enum: ['active', 'unactive']
    }
})


module.exports = userSchema