const express = require('express')
const mongoose = require("mongoose");
const userSchema = require("../Schema/UserSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = mongoose.model('User', userSchema)

router.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try {
        const user = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPassword
        })
        user.save()
        res.status(200).json({
            message: 'User was created sucessful'
        })
    } catch (error) {
        res.status(404).json({
            err: 'Unable to create user'
        })

    }
})

router.post('/login', async (req, res) => {
    const userData = await User.find({ userName: req.body.userName })
    if (userData && userData.length > 0) {
        const isValitedPassword = await bcrypt.compare(req.body.password, userData[0].password)
        console.log(isValitedPassword);

        if (isValitedPassword) {
            const jwToken = jwt.sign({
                userName: userData[0].userName,
                id: userData[0]._id
            }, 'alskdjsadfasdf', {
                expiresIn: '1h'
            })

            res.status(200).json({
                'JWT': jwToken,
                "message": 'user login sucesfull'
            })

        } else {
            res.status(401).json({
                "error": 'Wrong Password'
            })
        }
    } else {
        res.status(401).json({
            "error": "User Not Found"
        })
    }
})

router.get('/', (req, res) => { })
router.get('/all', (req, res) => { })
router.put('/:id', (req, res) => { })
router.delete('/:id', (req, res) => { })

module.exports = router