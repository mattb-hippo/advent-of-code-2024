const fs = require('fs');
const readline = require('readline');

var letters = [];

const stream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    var lineArray = [];
    for (var x=0; x<line.length; x++) {
        lineArray[x] = line.charAt(x);
    }
    letters.push(lineArray);
});

var instances = 0;

rl.on('close', () => {

    for (var x=0; x<letters.length; x++) {
        for (var y=0; y<letters[x].length; y++) {
            try {
                // horizontal left to right
                if (letters[x][y] == 'X'
                    && letters[x][y+1] == 'M'
                    && letters[x][y+2] == 'A'
                    && letters[x][y+3] == 'S') {
                        instances++;
                    }
            } catch {}
            try {
                // horizontal right to left
                if (letters[x][y] == 'X'
                    && letters[x][y-1] == 'M'
                    && letters[x][y-2] == 'A'
                    && letters[x][y-3] == 'S') {
                        instances++;
                    }
            } catch {}
            try {
                // up
                if (letters[x][y] == 'X'
                    && letters[x-1][y] == 'M'
                    && letters[x-2][y] == 'A'
                    && letters[x-3][y] == 'S') {
                        instances++;
                    }
            } catch {}
            try {
                    // down
                if (letters[x][y] == 'X'
                    && letters[x+1][y] == 'M'
                    && letters[x+2][y] == 'A'
                    && letters[x+3][y] == 'S') {
                        instances++;
                    }
            } catch {}
            try {
                // diagonal bottom left to top right
                if (letters[x][y] == 'X'
                    && letters[x-1][y+1] == 'M'
                    && letters[x-2][y+2] == 'A'
                    && letters[x-3][y+3] == 'S') {
                        instances++;
                    }
            } catch {}
            try {
                    // diagonal bottom right to top left
                if (letters[x][y] == 'X'
                    && letters[x-1][y-1] == 'M'
                    && letters[x-2][y-2] == 'A'
                    && letters[x-3][y-3] == 'S') {
                        instances++;
                    }
            } catch {}
            try {
                    // diagonal top left to bottom right
                if (letters[x][y] == 'X'
                    && letters[x+1][y+1] == 'M'
                    && letters[x+2][y+2] == 'A'
                    && letters[x+3][y+3] == 'S') {
                        instances++;
                    }
            } catch {}
            try {
                    // diagonal top right to bottom left
                if (letters[x][y] == 'X'
                    && letters[x+1][y-1] == 'M'
                    && letters[x+2][y-2] == 'A'
                    && letters[x+3][y-3] == 'S') {
                        instances++;
                    }
            }
            catch (e) {
                // just eat that error and continue
            }
        }
    }
    console.log('\nInstances: ' + instances + '\n\n');
});
