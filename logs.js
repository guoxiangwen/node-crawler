/**
 * Created by QiYao on 2017/4/17.
 */
const readline = require('readline');
const fs = require('fs');
const list = [];
var size = 0;
let count1 = 0;
let count2 = 0;

const file1 = "./1234/090011.log";

function prepare() {
    // console.log(size);
    var rl = readline.createInterface({
        input: fs.createReadStream(file1)
    });
    var rt = readline.createInterface({
        input: fs.createReadStream(file1)
    });

    rl.on('line', function(line) {
        var x = line.indexOf("getUserDetial")
            // var y = line.indexOf("getUserDetial")

        if (x !== -1) {
            // list.push(x)
            count1++;
        }
        // if (y !== -1) {
        //     count2++;
        // }

        // console.log(line[0]);
    });
    rt.on('line', function(line) {
        var y = line.indexOf("MzBhMTBlMjE")
            // var y = line.indexOf("getUserDetial")
        if (y !== -1) {
            count2++;
        }

        // console.log(line[0]);
    });

    rl.on('close', function() {
        fs.appendFile("./count.log", count1 + '\n' + count2 + '\n');

    });
}

prepare();