const fs = require('fs/promises');
const path = require('path');

const copyFolder = fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
copyFolder.then(() => {
    const copyFolderContent = fs.readdir(path.join(__dirname, 'files-copy'));
    copyFolderContent.then((files) => {
        files.forEach((file) => {
            fs.rm(path.join(__dirname, 'files-copy', file));
        });
    });
});
copyFolder.then(() => {
    const folderContent = fs.readdir(path.join(__dirname, 'files'));
    folderContent.then((folderContent) => {
        folderContent.forEach(file => {
            copyContent(file);
        });
    });
});


async function copyContent(content) {
    const copy = await fs.copyFile(path.join(__dirname, 'files', content), path.join(__dirname, 'files-copy', content));
    return copy;
}