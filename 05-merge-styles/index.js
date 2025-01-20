const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

async function createBundle() {
    await fsPromises.rm(path.join(__dirname, 'project-dist', 'bundle.css'), { force: true });
    const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
    const writeStream = fs.createWriteStream(bundleFile, { flags: 'a' });
    const styles = await fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    for (const file of styles) {
        const fileExt = path.extname(file.name);
        if (file.isFile() && fileExt === '.css') {
            const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
            readStream.pipe(writeStream);
        }
    };
}

createBundle();
