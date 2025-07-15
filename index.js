const exprees = require('express')
const app = exprees()
const multer = require('multer')

const distFile = './uploadFile/'
const storage = multer.diskStorage()
const upload = multer({
    dest: distFile,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png') {
            cb(null, true)
        }
        else {
            cb(new Error('please provide a png image'))
        }
    }

})

app.post('/', upload.single('avatar'), (req, res) => {
    res.send('hello post data')
})

app.get('/', (req, res) => {
    res.send('hellow world')
})

app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.send('there was an errror')
        } else {
            res.send(err.message)
        }
    }
})

app.listen(3000, () => {
    console.log('running');

})