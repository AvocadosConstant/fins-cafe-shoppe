var algos = require("../app/algos.js");

var input = require("../testcases/input/input_original.json");
var fifoOutput = require("../testcases/output/output_fifo.json");

describe("FIFO Implementation", function() {
  it("matches given output", function(done) { 
    var calculatedOutput = algos.fifo(input);
    expect(JSON.stringify(calculatedOutput)).toBe(JSON.stringify(fifoOutput));
    done();
  });
});
