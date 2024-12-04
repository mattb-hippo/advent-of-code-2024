const fs = require('fs');
const readline = require('readline');

var list1 = [], list2 = [];

const stream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

var total = 0;
var enabled = true;

rl.on('line', (line) => {
    console.log('------------');
    const pattern = /(mul\([0-9]+\,[0-9]+\))|(do\(\))|(don\'t\(\))/g;
    var matches = line.match(pattern);

    matches.forEach(element => {
        console.log(element);
        switch (element) {
            case 'do()':
                enabled = true; break;
            case 'don\'t()':
                enabled = false; break;
            default:
                if (enabled) {
                    const pattern2 = /[0-9]+/g;
                    var values = element.match(pattern2);
                    console.log(values);
                    total += (values[0] * values[1]);
                }
            break;
        }
    });
});


rl.on('close', () => {
    console.log('\nTotal: ' + total + '\n\n');
});
