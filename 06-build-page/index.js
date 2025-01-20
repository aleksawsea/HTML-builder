const fs = require('fs/promises');
const path = require('path');

async function BuildHTML() {
    const folderPath = path.join(__dirname, 'project-dist');
    await fs.mkdir(folderPath, { recursive: true });
    const existingFiles = await fs.readdir(folderPath);
    for (const file of existingFiles) {
        await fs.rm(path.join(folderPath, file));
    };
}
