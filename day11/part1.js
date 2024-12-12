import { createReadStream } from 'fs';
import * as readline from "readline";

const stream = createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let stones = [];

rl.on('line', (line) => {
    stones = line.split(" ");
});

rl.on('close', () => {
    for (let blinkCount=0; blinkCount<25; blinkCount++) {
        let newStones = [];
        for (let stoneIdx=0; stoneIdx<stones.length; stoneIdx++) {
            let stone = parseInt(stones[stoneIdx]);
            if (stone == 0) {
                newStones.push(1);
            }
            else if (("" + stone).length % 2 == 0) {
                let stoneStr = "" + stone;
                newStones.push(stoneStr.substring(0, (stoneStr.length / 2)));
                newStones.push(stoneStr.substring(stoneStr.length / 2));
            }
            else {
                newStones.push(stone * 2024);
            }
        }
        stones = newStones;
    }

    console.log('\nNumber of stones: ' + stones.length + '\n\n');
});
