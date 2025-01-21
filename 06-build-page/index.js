const fs = require('fs/promises');
const fsStreams = require('fs');
const path = require('path');

async function BuildHTML() {
    const folderPath = path.join(__dirname, 'project-dist');
    await fs.mkdir(folderPath, { recursive: true });
    const existingFiles = await fs.readdir(folderPath);
    for (const file of existingFiles) {
        await fs.rm(path.join(folderPath, file));
    };
    createIndex();
    createBundle()
    await fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
    copyFolderContent(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
}

async function createIndex() {
    let components = {};
    const compFiles = await fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
    for (const file of compFiles) {
        const content = await fs.readFile(path.join(file.path, file.name), { encoding: 'utf8' });
        const key = path.basename(file.name, '.html')
        components[key] = content;
    };
    const templateFile = await fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });
    const regExp = /\{\{(\w+)\}\}/g;
    const replacedFile = templateFile.replace(regExp, (_, placeholder) => {
        return components[placeholder];
    });
    const indexFile = path.join(__dirname, 'project-dist', 'index.html');
    const htmlStream = fsStreams.createWriteStream(indexFile);
    htmlStream.write(replacedFile);
}

async function createBundle() {
    const bundleFile = path.join(__dirname, 'project-dist', 'style.css');
    const writeStream = fsStreams.createWriteStream(bundleFile, { flags: 'a' });
    const styles = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    for (const file of styles) {
        const fileExt = path.extname(file.name);
        if (file.isFile() && fileExt === '.css') {
            const readStream = fsStreams.createReadStream(path.join(__dirname, 'styles', file.name));
            readStream.pipe(writeStream);
        }
    };
}

async function copyFolderContent(srcName, destName) {
    const filesForCopying = await fs.readdir(srcName, { withFileTypes: true });
    await fs.mkdir(destName, { recursive: true });
    for (const file of filesForCopying) {
        const sourceFilePath = path.join(srcName, file.name);
        const destinationFilePath = path.join(destName, file.name);
        if (file.isDirectory()) {
            await copyFolderContent(sourceFilePath, destinationFilePath);
        } else if (file.isFile()) {
            await fs.copyFile(sourceFilePath, destinationFilePath);
        }
    };
}

BuildHTML();
