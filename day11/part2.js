import { createReadStream } from 'fs';
import * as readline from "readline";

const stream = createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let stones = {};

rl.on('line', (line) => {
    line.split(" ").forEach(stone => {
        addStone(stone, 1);
    });
});

function addStone (stone, count) {
    stones[parseInt(stone)] = stones[stone] == null ? count : stones[stone]+=count;
}

function removeStone (stone, count) {
    stones[parseInt(stone)] -= count;
}

rl.on('close', () => {

    let blinks = 75;
    for (let x=0; x<blinks; x++) {
        blink();
    }

    let total = 0;
    for (let stone in stones) {
        total += stones[stone];
    }

    console.log('\nTotal: ' + total + '\n\n');

    function blink() {

        let keys = [], values = [];
        for (let stone in stones) {
            keys.push(stone);
            values.push(stones[stone]);
        }
        for (let x=0; x<keys.length; x++) {
            let stone = parseInt(keys[x]);
            let count = parseInt(values[x]);

            if (count == 0) continue;

            if (stone == 0) {
                addStone(1, count);
                removeStone(0, count);
            }
            else if (("" + stone).length % 2 == 0) {
                let stoneStr = "" + stone,
                    left = parseInt(stoneStr.substring(0, (stoneStr.length / 2))),
                    right = parseInt(stoneStr.substring(stoneStr.length / 2));
                
                addStone(left, count);
                addStone(right, count);
                removeStone(stone, count);
            }
            else {
                addStone(stone * 2024, count);
                removeStone(stone, count);
            }
        }
    }
});
