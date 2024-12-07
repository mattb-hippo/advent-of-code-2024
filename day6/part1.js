const fs = require('fs');
const readline = require('readline');


const stream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

var map = [], start, r=0;

rl.on('line', (line) => {
    var mapLine = [];
    for (var x=0; x<line.length; x++) {
        mapLine.push(line[x]);
        if (line[x] == '^') {
            start = [r, x, 'n'];
        }
    }
    map.push(mapLine);
    r++;
});


rl.on('close', () => {

    var orientation = 'n',
        position = [start[0], start[1]],
        visitedSquares = [];

    recordPosition();

    while (facing() != 'edge') {

        switch (facing()) {
            case 'empty': step(); break;
            case 'blocked': turn(); break;
        }

        recordPosition();
    }

    console.log('\nVisited Squares: ' + visitedSquares.length + '\n\n');

    function recordPosition () {
        var alreadyVisited = false;
        for (var s=0; s<visitedSquares.length; s++) {
            var square = visitedSquares[s];
            if (square[0] == position[0] && square[1] == position[1]) {
                alreadyVisited = true;
            }
        }
        if (!alreadyVisited) visitedSquares.push([position[0], position[1]]);
    }

    function facing () {
        let cell;
        switch (orientation) {
            case 'n':
                if (position[0] == 0) return 'edge'; 
                cell = [position[0]-1, position[1]];
            break;
            case 's':
                if (position[0] == map.length-1) return 'edge';
                cell = [position[0]+1, position[1]];
            break;
            case 'e':
                if (position[1] == map[0].length-1) return 'edge';
                cell = [position[0], position[1]+1];
            break;
            case 'w':
                if (position[1] == 0) return 'edge';
                cell = [position[0], position[1]-1];
            break;
        }
        switch (map[cell[0]][cell[1]]) {
            case '.': return 'empty'
            case '#': return 'blocked'
        }
    }

    function turn () {
        if (orientation == 'n') { orientation = 'e'; }
        else if (orientation == 'e') { orientation = 's'; }
        else if (orientation == 's') { orientation = 'w'; }
        else { orientation = 'n'; }
    }

    function step () {
        switch (orientation) {
            case 'n': position = [position[0]-1, position[1]]; break;
            case 's': position = [position[0]+1, position[1]]; break;
            case 'e': position = [position[0], position[1]+1]; break;
            case 'w': position = [position[0], position[1]-1]; break;
        }
    }
});
