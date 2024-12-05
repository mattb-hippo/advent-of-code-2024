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

function updateInOrder (update) {
    var inOrder = true;
    rules.forEach(rule => {
        if (ruleDisobeyed(update, rule)) {
            inOrder = false;
        }
    });
    return inOrder;
}

function ruleDisobeyed(update, rule) 
{
    var first = rule[0],
        second = rule[1],
        firstIndex = update.indexOf(first),
        secondIndex = update.indexOf(second);

    if (firstIndex > -1 && secondIndex > -1) {
        if (secondIndex < firstIndex) {
            return true;
        }
    }
    return false;
}

function middleValue(update) {
    var idx = Math.floor(update.length / 2);
    return parseInt(update[idx]);
}

rl.on('close', () => {
    var total = 0;
    badUpdates = [];
    updates.forEach(update => {
        if (!updateInOrder(update)) {
            badUpdates.push(update);
        }
    });
    

    badUpdates.forEach(update => {
        var stop = false;
        while(!updateInOrder(update) && !stop) {
            for (r=0; r<rules.length; r++) {
                rule = rules[r];
                if (ruleDisobeyed(update, rule)) {
                    var newUpdate = [];
                    for (u=0; u<update.length; u++) {
                        if (u !== update.indexOf(rule[0]) && u !== update.indexOf(rule[1])) {
                            newUpdate.push(update[u]);
                        }
                        if (u == update.indexOf(rule[1])) {
                            newUpdate.push(update[update.indexOf(rule[0])]);
                            newUpdate.push(update[update.indexOf(rule[1])]);
                        }
                    }
                    update = newUpdate;
                }
            }
        }
        total += middleValue(update);
    });

    console.log('\nTotal: ' + total + '\n\n');
});
