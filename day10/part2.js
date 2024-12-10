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
    let distinctRoutes = [],
        totalTrailHeadScore = 0;
        
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if (map[y][x] == 0) {
                distinctRoutes = [];
                leadsToTrail(y, x, 0, []);
                totalTrailHeadScore += distinctRoutes.length;
            }
        }
    }

    console.log('\nTotal trail head score: ' + totalTrailHeadScore + '\n\n');

    function leadsToTrail (y, x, currentLevel, route) {
        route.push([y,x]);
        if (currentLevel == 9) {
            distinctRoutes.push(route);
            return;
        }

        let nextLevel = currentLevel + 1;

        if (y > 0 && map[y-1][x] == nextLevel) leadsToTrail(y-1, x, nextLevel, route);
        if (y < map.length - 1 && map[y+1][x] == nextLevel) leadsToTrail(y+1, x, nextLevel, route);
        if (x > 0 && map[y][x-1] == nextLevel) leadsToTrail(y, x-1, nextLevel, route);
        if (x < map[0].length - 1 && map[y][x+1] == nextLevel) leadsToTrail(y, x+1, nextLevel, route);
    }
});
