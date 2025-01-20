const fs = require('fs/promises');
const path = require('path');
// const fs = require('fs');

const secretFolder = path.join(__dirname, 'secret-folder');
const files = fs.readdir(secretFolder, { withFileTypes: true });
files.then((files) => {
    files.forEach((file) => {
        if (file.isFile()) {
            const fileExt = path.extname(file.name);
            const fileName = path.basename(file.name, fileExt);
            let fileSize = 0;
            const filePath = path.join(secretFolder, file.name);
            const stat = fs.stat(filePath);
            stat.then((stat) => {
                fileSize = (stat.size / 1024).toFixed(3);
                console.log(`${fileName}  -   ${fileExt}  -   ${fileSize} kb`);
            });
        }
    });
});