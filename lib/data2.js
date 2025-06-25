const fs = require('fs')
const path = require('path')


const lib = {}
lib.baseDir = path.join(__dirname + './../.data/')


lib.read = (folderName, fileName, callback) => {

    fs.readFile(lib.baseDir + folderName + '/' + fileName + '.json', 'utf-8', (err, data) => {
        if (!err && data) {
            callback(err, data)
        } else {
            callback(err, data)
        }
    })

}

lib.write = (folderName, fileName, data, callback) => {

    fs.writeFile(lib.baseDir + folderName + '/' + fileName + '.json', JSON.stringify(data), { flag: 'wx' }, (err) => {
        if (!err) {
            callback(false, 'File created successfully')
        } else {
            callback(err, 'Failed to create file or file already exists')
        }
    })
    // fs.open(lib.baseDir + folderName, fileName + '.json', 'wx', (err, fileDescriptor) => {
    //     const stingData = JSON.stringify(data)
    //     if (!err && fileDescriptor) {
    //         fs.write(fileDescriptor, stingData, (err) => {
    //             if (!err) {
    //                 fs.close(fileDescriptor, (err) => {
    //                     if (!err) {
    //                         callback('File add Sucessful')
    //                     } else {
    //                         callback('failed to close file')
    //                     }
    //                 })
    //             } else {
    //                 callback('failed to write file')
    //             }
    //         })
    //     } else {
    //         callback('faild to create file')
    //     }
    // })
}

lib.update = (folderName, fileName, data, callback) => {
    console.log(data);

    fs.truncate(lib.baseDir + folderName + '/' +  + '.json', (err) => {
        if (!err) {
            fs.writeFile(lib.baseDir + folderName + '/' + fileName + '.json', JSON.stringify(data), (err) => {
                if (!err) {
                    callback(false, 'File updated successfully')
                } else {
                    callback(err, 'Failed to update file')
                }
            })
        } else {
            callback(err, 'Failed to truncate file')
        }
    })
}


module.exports = lib