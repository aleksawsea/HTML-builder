const fs = require('fs/promises');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');
const files = fs.readdir(secretFolder, { withFileTypes: true });
