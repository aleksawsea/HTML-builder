const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input } = process;

const filePath = path.join(__dirname, 'test.txt');
const fileStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({ input });
console.log('Hi there! Please, write your content for the created file ^^');
rl.on('line', (line) => {
    if (line === 'exit') {
        rl.close();
    } else {
        fileStream.write(line + '\n');
        process.on('SIGINT', () => {
            rl.close();
        });
    }
});
rl.on('close', () => {
    console.log('Thanks for the cross-check, have a good day! :)')
})
rl.on('error', (err) => {
    console.log(err);
});