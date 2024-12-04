const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

var safeReports = 0;

rl.on('line', (line) => {
    var report = line.split(' ');
    var safe = isReportSafe(report);
    if (safe) {
        safeReports += 1;
    }
    else {
        for (var level = 0; level < report.length; level ++) {
            var newReport = [];
            for (var x=0; x < report.length; x ++) {
                if (x != level) newReport.push(report[x]);
            }
            var newReportSafe = isReportSafe(newReport);
            if (newReportSafe) {
                safeReports += 1;
                break;
            }
        }
    }
});

isReportSafe = function (report, debug = 0) {
    if (debug >= 2) console.log(report);
    var increasing = null;

    for (var x=0; x < report.length-1; x++) {
        var v1 = parseInt(report[x]), v2 = parseInt(report[x+1]);
        if (debug >= 2) console.log(x, v1, v2);
        if (x == 0) {
            if (v1 < v2) increasing = true;
            if (v2 < v1) increasing = false;
        }

        if (v1 == v2) {
            if (debug >= 1) console.log('equal values');
            return (false);
        }

        if (increasing && (v2 < v1)) {
            if (debug >= 1) console.log('sequence increasing, but decreasing value found', v1, v2);
            return (false);
        }
        if (!increasing && (v2 > v1)) {
            if (debug >= 1) console.log('sequence decreasing, but increasing value found', v1, v2);
            return (false);
        }
        if (increasing && ((v2 - v1) > 3)) {
            if (debug >= 1) console.log('sequence increasing, but value increasing by ' + (v2 - v1), v1, v2);
            return (false);
        }
        if (!increasing && ((v1 - v2) > 3)) {
            if (debug >= 1) console.log('sequence decreasing, but value decreasing by ' + (v1 - v2), v1, v2);
            return (false);
        }
    }
    return true;
}

rl.on('close', () => {
    console.log("Safe Reports: " + safeReports + "\n\n");
});


