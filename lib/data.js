const fs = require('fs');
const path = require('path')

const lib = {};

lib.baseDir = path.join(__dirname + '../data/')

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
            callback('File could not created. It may exists')
        }

    })
}


module.exports = lib;