const path = require('path');
const fs = require('fs');
const process = require('process');

const pathToFile = path.join(__dirname, 'text.txt');
const fileStream = fs.createReadStream(pathToFile);
const { stdout } = process;
fileStream.on('data', (chunk) => {
    stdout.write(chunk);
});
fileStream.on('err', (err) => {
    console.log(err);
});