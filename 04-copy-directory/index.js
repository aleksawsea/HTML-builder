const fs = require('fs/promises');
const path = require('path');

async function copyFolderContent() {
    const sourceDir = path.join(__dirname, 'files');
    const destinationDir = path.join(__dirname, 'files-copy');
    await fs.mkdir(destinationDir, { recursive: true });
    const existingFiles = await fs.readdir(destinationDir);
    for (const file of existingFiles) {
        await fs.rm(path.join(destinationDir, file));
    };
    const filesForCopying = await fs.readdir(sourceDir);
    for (const file of filesForCopying) {
        await copyContent(file);
    };


    async function copyContent(content) {
        const copy = await fs.copyFile(path.join(sourceDir, content), path.join(destinationDir, content));
        return copy;
    }
}
copyFolderContent();