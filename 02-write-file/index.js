const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = process;

const filePath = path.join(__dirname, 'test.txt');
const fileStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({ input, output: fileStream });
console.log('Hi there! Please, write your content for the created file ^^');
rl.on('line', (line) => {
    rl.write(line);
    // fileStream.write(line);
    process.on('SIGINT', () => {
        process
    })
});
rl.on('error', (err) => {
    console.log(err);
});