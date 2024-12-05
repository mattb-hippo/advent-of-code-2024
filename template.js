const fs = require('fs');
const readline = require('readline');

var list1 = [], list2 = [];

const stream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
});


rl.on('close', () => {
});
