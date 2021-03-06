var fs = require("fs");
var algos = require("./algos.js");
var analytics = require("./analytics.js");

var ARGS = process.argv.slice(2);

var inputFile = ARGS[0];
var input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
//try {
//  input = require(ARGS[0]);
//}
//catch (err) {
//  console.error("Argument must be a JSON file in a valid format.\nExiting...");
//  console.error(err);
//  process.exit(1);
//}


var output = algos.fifo(input);
//console.log(output);
analytics.analyze(input, output, "FIFO implementation");

output = algos.tims(JSON.parse(JSON.stringify(input)));
//console.log(output);
analytics.analyze(input, output, "Tim's implementation");
