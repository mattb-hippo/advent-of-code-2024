import { createReadStream } from 'fs';
import * as readline from "readline";

const stream = createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let equations = [];

rl.on('line', (line) => {
    equations.push(line.split(' '));
});


rl.on('close', () => {
    let total = 0;
    equations.forEach(equation => {
        let result = parseInt(equation[0].replace(':', ''));
        let factors = equation.slice(1);
        let operandArray = generateOperandArray(factors.length -1 );
        let solves = false;
        for (let x=0; x<operandArray.length; x++) {
            let calc = calculateResult(factors, operandArray[x]);
            if (result == calc) {
                solves = true;
                break;
            }
        }
        if (solves) {
            total += parseInt(result);
        }

    });
    console.log(total);
});

function generateOperandArray (len) {
    let operandArray = [];
    if (len == 0) return [];
    if (len == 1) {
        operandArray.push(['+']);
        operandArray.push(['*']);
    } 
    else {
        let arr = generateOperandArray(len-1);
        for (let x=0; x<arr.length; x++) {
            operandArray.push(['+'].concat(arr[x]));
            operandArray.push(['*'].concat(arr[x]));
        }
    }
    return operandArray;
}

function calculateResult (factors, operands) {
    let total;
    for (var x=0; x<operands.length; x++) {
        let operand = operands[x], a, b;
        if (x==0) {
            a = parseInt(factors[0]);
        }
        else {
            a = total;
        }
        b = parseInt(factors[x+1]);
        switch (operand) {
            case '+': total = a + b; break;
            case '*': total = a * b; break;
            default: // nothing
            break;
        }

    }
    return total;
}