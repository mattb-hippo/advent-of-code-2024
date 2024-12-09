import { createReadStream } from 'fs';
import * as readline from "readline";

const stream = createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let map = [];

rl.on('line', (line) => {
    let mapLine = [];
    for (var x=0; x<line.length; x++) {
        mapLine[x] = line[x];
    }
    map.push(mapLine);
});


rl.on('close', () => {
    let antinodes = [];
    for (let y1=0; y1<map.length; y1++) {
        for (let x1=0; x1<map[y1].length; x1++) {
            if (map[y1][x1] != '.') {
                let frequency = map[y1][x1];
                for (let y2=0; y2<map.length; y2++) {
                    for (let x2=0; x2<map[y2].length; x2++) {
                        if ((y1 != y2 || x1 != x2) && map[y2][x2] == frequency) {
                            let foundAntinodes = findAntinodes([y1, x1], [y2, x2]);
                            for (var i=0; i<foundAntinodes.length; i++) {
                                let foundAntinode = foundAntinodes[i];
                                let isNew = true;
                                for (let j=0; j<antinodes.length; j++) {
                                    if (antinodes[j][0] == foundAntinode[0] && antinodes[j][1] == foundAntinode[1]) {
                                        isNew = false;
                                        break;
                                    }
                                }
                                if (isNew) antinodes.push(foundAntinode);
                            }
                        }
                    }
                }
            }
        }
    }

    console.log("\nTotal Antinodes: " + antinodes.length + "\n\n");
});

function findAntinodes (a, b) {
    let distance = findDistance(a, b);
    let antinodes = [];

    let oob = false;
    let mult = 1;
    while (oob == false) {
        let antinodeCandidate = [a[0]+(distance[0]*mult), a[1]+(distance[1]*mult)];

        if (antinodeCandidate[0] < 0 || antinodeCandidate[1] < 0 || antinodeCandidate[0] > map.length-1 || antinodeCandidate[1] > map[0].length-1) {
            oob = true;
        }
        else {
            antinodes.push(antinodeCandidate);
            mult++;
        }
    }
    antinodes.push(a);
    antinodes.push(b);
    return antinodes;
}

function findDistance (a, b) {
    let distance = [];
    for (var x=0; x<=1; x++) {
        distance[x] = a[x] - b[x];
    }
    return distance;
}