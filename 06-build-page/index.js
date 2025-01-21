const fs = require('fs/promises');
const path = require('path');

async function BuildHTML() {
    const folderPath = path.join(__dirname, 'project-dist');
    await fs.mkdir(folderPath, { recursive: true });
    const existingFiles = await fs.readdir(folderPath);
    for (const file of existingFiles) {
        await fs.rm(path.join(folderPath, file));
    };
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
}
BuildHTML();

