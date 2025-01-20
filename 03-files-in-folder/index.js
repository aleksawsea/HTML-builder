const fs = require('fs/promises');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');
const files = fs.readdir(secretFolder, { withFileTypes: true });
files.then((files) => {
    files.forEach((file) => {
        if (file.isFile()) {
            console.log(file.isFile());
        }
    });
});