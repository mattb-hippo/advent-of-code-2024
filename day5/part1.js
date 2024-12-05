const fs = require('fs');
const readline = require('readline');

var list1 = [], list2 = [];

const stream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

var rules = [];
var updates = [];
rl.on('line', (line) => {
    if (line == '') return;
    if (line.indexOf('|') > -1) {
        var vals = line.split('|');
        rules.push([vals[0], vals[1]]);
    }
    else {
        updates.push(line.split(','));
    }
});


rl.on('close', () => {
    var total = 0;
    updates.forEach(update => {
        var inOrder = true;
        rules.forEach(rule => {
            var first = rule[0], second = rule[1];
            var firstIndex = update.indexOf(first),
                secondIndex = update.indexOf(second);
            if (firstIndex > -1 && secondIndex > -1) {
                if (secondIndex < firstIndex) {
                    inOrder = false;
                }
            }
        });
        if (inOrder) {
            var middle = Math.floor(update.length / 2);
            total += parseInt(update[middle]);
        }
    });

    console.log('\nTotal: ' + total + '\n\n');
});
