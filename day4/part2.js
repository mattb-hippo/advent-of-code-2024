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

    var found = [];

    function addIfNotFound(x, y) {
        add = true;
        found.forEach(val => {
            if (val[0] == x && val[1] == y) add = false;
        });
        if (add) {
            instances += 1;
            found.push([x,y]);
        }
    }

    for (var x=0; x<letters.length; x++) {
        for (var y=0; y<letters[x].length; y++) {
            try {
                // diagonal bottom left to top right
                if (letters[x][y] == 'M'
                    && letters[x-1][y+1] == 'A'
                    && letters[x-2][y+2] == 'S'
                    
                    && letters[x-2][y] == 'M'
                    && letters[x][y+2] == 'S'
                    ) {
                        addIfNotFound(x-1, y+1);
                    }
            } catch {}

            try {
                // diagonal bottom left to top right
                if (letters[x][y] == 'M'
                    && letters[x-1][y+1] == 'A'
                    && letters[x-2][y+2] == 'S'
                    
                    && letters[x-2][y] == 'S'
                    && letters[x][y+2] == 'M'
                    ) {
                        addIfNotFound(x-1, y+1);
                    }
            } catch {}

            try {
                // diagonal bottom right to top left
                if (letters[x][y] == 'M'
                    && letters[x-1][y-1] == 'A'
                    && letters[x-2][y-2] == 'S'
                    
                    && letters[x-2][y] == 'M'
                    && letters[x][y-2] == 'S'
                    ) {
                        addIfNotFound(x-1, y-1);
                    }
            } catch {}

            try {
                // diagonal bottom right to top left
                if (letters[x][y] == 'M'
                    && letters[x-1][y-1] == 'A'
                    && letters[x-2][y-2] == 'S'
                    
                    && letters[x-2][y] == 'S'
                    && letters[x][y-2] == 'M'
                    ) {
                        addIfNotFound(x-1, y-1);
                    }
            } catch {}

            try {
                // diagonal top left to bottom right
                if (letters[x][y] == 'M'
                    && letters[x+1][y+1] == 'A'
                    && letters[x+2][y+2] == 'S'
                    
                    && letters[x+2][y] == 'M'
                    && letters[x][y+2] == 'S'
                    ) {
                        addIfNotFound(x+1, y+1);
                    }
            } catch {}

            try {
                // diagonal top left to bottom right
                if (letters[x][y] == 'M'
                    && letters[x+1][y+1] == 'A'
                    && letters[x+2][y+2] == 'S'
                    
                    && letters[x+2][y] == 'S'
                    && letters[x][y+2] == 'M'
                    ) {
                        addIfNotFound(x+1, y+1);
                    }
            } catch {}

            try {
                // diagonal top right to bottom left
                if (letters[x][y] == 'M'
                    && letters[x+1][y-1] == 'A'
                    && letters[x+2][y-2] == 'S'
                    
                    && letters[x+2][y] == 'M'
                    && letters[x][y-2] == 'S'
                    ) {
                        addIfNotFound(x+1, y-1);
                    }
            } catch {}

            try {
                // diagonal top right to bottom left
                if (letters[x][y] == 'M'
                    && letters[x+1][y-1] == 'A'
                    && letters[x+2][y-2] == 'S'
                    
                    && letters[x+2][y] == 'S'
                    && letters[x][y-2] == 'M'
                    ) {
                        addIfNotFound(x+1, y-1);
                    }
            } catch {}

        }
    }
    console.log('\nInstances: ' + instances + '\n\n');
});
