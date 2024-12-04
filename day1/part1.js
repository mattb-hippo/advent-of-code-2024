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
    console.log(list1.length);
    list1.sort(); list2.sort();

    var x=0, distance = 0;
    list1.forEach(val1 => {
        val2 = list2[x++];
        distance += Math.abs(val1 - val2);
    })

    console.log('Distance: ' + distance);
});
