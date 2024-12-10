import { createReadStream } from 'fs';
import * as readline from "readline";

const stream = createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let diskMap = '';

rl.on('line', (line) => {
    diskMap = line;
});


rl.on('close', () => {
    let fileId = -1,
        diskArray = [];

    for(let x=0; x<diskMap.length; x++) {
        let char = parseInt(diskMap[x]),
            val = '';
        if (x%2 == 0) {
            val = ++fileId;
        }
        else {
            val = '.';
        }
        for (let i=0; i<char; i++) {
            diskArray.push(val);
        }
    }

    while (lastFileBlockPosition() > diskArray.indexOf('.')) {
        diskArray[diskArray.indexOf('.')] = diskArray[lastFileBlockPosition()];
        diskArray[lastFileBlockPosition()] = '.';
    }

    let checksum = 0;
    for (let x=0; x<diskArray.length; x++) {
        if (diskArray[x] != '.') checksum += (x * parseInt(diskArray[x]));
    }

    console.log('\nChecksum: ' + checksum + '\n\n');

    function lastFileBlockPosition () {
        for (let x=diskArray.length-1; x>=0; x--) {
            if (diskArray[x] != '.') return x;
        }
    }
});
