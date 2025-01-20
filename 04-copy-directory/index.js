const fs = require('fs/promises');
const path = require('path');

const copyFolder = fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
