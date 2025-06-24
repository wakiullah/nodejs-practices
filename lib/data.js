const fs = require('fs');
const path = require('path')

const lib = {};




lib.baseDir = path.join(__dirname + '/../.data/')

lib.createFile = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + file + '.json', 'wx', (err, fileDescriptor) => {

        if (!err && fileDescriptor) {

            // Convert data to string
            const stringData = JSON.stringify(data);

            // Write to file
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                    fs.close(fileDescriptor, (err) => {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing the file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });

        } else {
            callback(err)
        }

    })
}

// read data from a file

lib.readFile = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + file + '.json', 'utf-8', (err, data) => {
        if (!err && data) {
            const parsedData = JSON.parse(data);
            callback(err, parsedData);
        } else {
            callback(err, data);
        }
    });
}
module.exports = lib;


//update data in a file

lib.updateFile = (dir, file, data, callback) => {

    const stringData = JSON.stringify(data)

    // Open the file for writing
    fs.open(lib.baseDir + dir + file + '.json', 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            fs.truncate(fileDescriptor, (err) => {
                if (!err) {
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if (!err) {
                            fs.close(fileDescriptor, (err) => {
                                callback(false)
                            })
                        } else {
                            callback('faild to write data')
                        }
                    })
                }
            })
        } else {
            callback('Error to open this file')
        }
    })
}

// delete a file