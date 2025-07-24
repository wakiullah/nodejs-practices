const express = require('express')
const router = express.Router()
const todoSchima = require('../Schema/TodoSchema')
const { default: mongoose } = require('mongoose')
const AuthMiddleWare = require('../middlewares/AuthMiddleware')


const Todo = mongoose.model('Todo', todoSchima)

router.get('/', AuthMiddleWare, async (req, res) => {
    const ab = req.body.userName
    const todos = await Todo.find()
    res.json({
        ...todos
    })
})
router.get('/:id', async (req, res) => { })
router.post('/', async (req, res) => {
    console.log(req.body);
    const newTodo = new Todo(req.body)
    await newTodo.save()
    res.send('sucessful')
})


router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body)
    res.send('update many sucedss')
})
router.put('/:id', async (req, res) => {

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
        $set: {
            status: 'inactive'
        }
    }, {})
    console.log(updatedTodo);
    res.send('dfsdf')
})
router.delete('/:id', async (req, res) => {
    Todo.deleteOne({ _id: req.params.id })
    res.send('delete  ' + req.params.id + ' sucedss')

})


module.exports = router