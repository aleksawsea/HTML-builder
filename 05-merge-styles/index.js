const fs = require('fs');
const path = require('path');

async function createBundle() {
    const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
    const stream = fs.createWriteStream(bundleFile);
}
createBundle();