import { createReadStream } from 'fs';
import * as readline from "readline";

const stream = createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let map = [];

rl.on('line', (line) => {
    let lineArray = [],
        x = 0;

    while (x < line.length) {
        lineArray[x] = line[x];
        x++;
    }

    map.push(lineArray);
});


rl.on('close', () => {
    let foundPeaks = [],
        totalTrailHeadScore = 0;
        
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if (map[y][x] == 0) {
                foundPeaks = [];
                leadsToTrail(y, x, 0);
                totalTrailHeadScore += foundPeaks.length;
            }
        }
    }

    console.log('\nTotal trail head score: ' + totalTrailHeadScore + '\n\n');

    function leadsToTrail (y, x, currentLevel) {
        if (currentLevel == 9) {
            let alreadyFound = false;
            for (let i=0; i<foundPeaks.length; i++) {
                if (foundPeaks[i][0] == y && foundPeaks[i][1] == x) {
                    alreadyFound = true;
                }
            }
            if (!alreadyFound) {
                foundPeaks.push([y,x]);
            }
            return;
        }

        let nextLevel = currentLevel + 1;

        if (y > 0 && map[y-1][x] == nextLevel) leadsToTrail(y-1, x, nextLevel);
        if (y < map.length - 1 && map[y+1][x] == nextLevel) leadsToTrail(y+1, x, nextLevel);
        if (x > 0 && map[y][x-1] == nextLevel) leadsToTrail(y, x-1, nextLevel);
        if (x < map[0].length - 1 && map[y][x+1] == nextLevel) leadsToTrail(y, x+1, nextLevel);
    }
});
