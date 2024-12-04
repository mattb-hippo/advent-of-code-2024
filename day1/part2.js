const fs = require('fs');
const readline = require('readline');

var list1 = [], list2 = [];

const stream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    var values = line.split('   ');
    list1.push(values[0]);
    list2.push(values[1]);
});


rl.on('close', () => {
    var similarity = 0;
    list1.forEach(val1 => {
        var occurrences = 0;
        list2.forEach(val2 => {
            if (val1 == val2) occurrences += 1;
        });
        similarity += val1 * occurrences;
    });

    console.log('Similarity: ' + similarity);
});
