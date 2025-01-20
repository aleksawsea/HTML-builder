const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(bundleFile, { flags: 'a' });
const styles = fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
styles.then((styles) => {
    styles.forEach((file) => {
        const fileExt = path.extname(file.name);
        if (file.isFile() && fileExt === '.css') {
            const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
            readStream.pipe(writeStream);
        }
    });
})
