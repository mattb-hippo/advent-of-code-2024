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

    for (let blockId=9999; blockId>=0; blockId--) {
        let firstFileBlock = diskArray.indexOf(blockId);
        let lastFileBlock = diskArray.lastIndexOf(blockId);
        let fileSize = lastFileBlock - firstFileBlock + 1;

        for (let spaceSearch=0; spaceSearch<firstFileBlock; spaceSearch++) {
            if (diskArray[spaceSearch] == '.') {
                let largeEnough = true;
                for (var f=0; f<fileSize; f++) {
                    if (diskArray[spaceSearch + f] != '.') {
                        largeEnough = false;
                    }
                }
                if (largeEnough) {
                    for (var f=0; f<fileSize; f++) {
                        diskArray[spaceSearch + f] = blockId;
                        diskArray[firstFileBlock + f] = '.';
                    }
                    break;
                }
            }
        }
    }

    let checksum = 0;
    for (let x=0; x<diskArray.length; x++) {
        if (diskArray[x] != '.') checksum += (x * parseInt(diskArray[x]));
    }

    console.log('\nChecksum: ' + checksum + '\n\n');
});
