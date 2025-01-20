const fs = require('fs/promises');
const path = require('path');

async function copyFolderContent() {
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
    const existingFiles = await fs.readdir(path.join(__dirname, 'files-copy'));
    for (const file of existingFiles) {
        await fs.rm(path.join(__dirname, 'files-copy', file));
    };
    const filesForCopying = await fs.readdir(path.join(__dirname, 'files'));
    for (const file of filesForCopying) {
        await copyContent(file);
    };


    async function copyContent(content) {
        const copy = await fs.copyFile(path.join(__dirname, 'files', content), path.join(__dirname, 'files-copy', content));
        return copy;
    }
}
copyFolderContent();