const exprees = require('express')
const app = exprees()
const multer = require('multer')
const filePath = require('path')
const distFile = './uploadFile/'

//jump to node js
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, distFile)
    },
    filename: (req, file, cb) => {
        const extName = filePath.extname(file.originalname)
        const fileName = file.originalname.replace(extName, '').toLowerCase().split(' ').join('-') + '-' + Date.now() + extName
        cb(null, fileName)
    },
})


//start mongodb journey

// we learn about crud oparation in mongodb

const upload = multer({
    storage: storage,
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