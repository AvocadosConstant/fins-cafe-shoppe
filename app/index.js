var algos = require("./algos.js");
var ARGS = process.argv.slice(2);

try {
  var input = require(ARGS[0]);
}
catch (err) {
  console.error("Argument must be a JSON file in a valid format.\nExiting...");
  process.exit(1);
}

var output = algos.fifo(input);
console.log(output);
