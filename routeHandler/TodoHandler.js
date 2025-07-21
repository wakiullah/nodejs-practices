const express = require('express')
const router = express.Router()
const todoSchima = require('../Schema/TodoSchema')
const { default: mongoose } = require('mongoose')


const Todo = new mongoose.model('Todo', todoSchima)

router.get('/', async (req, res) => { })
router.get('/:id', async (req, res) => { })
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)
    await newTodo.save(err => {
        if (err) {
            res.status(500).json({
                error: 'Theare were an error to post!'
            })
        } else {
            res.status(200).json({
                message: 'todo was created sucessfuly!'
            })
        }
    })
})
router.post('/all', async (req, res) => { })
router.put('/:id', async (req, res) => { })
router.delete('/:id', async (req, res) => { })

module.exports = router