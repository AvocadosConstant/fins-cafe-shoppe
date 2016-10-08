var exports = module.exports = {};
var menu = require("./menu.js");

exports.analyze = function(input, output) {
  console.log("\n------------------------\n");
  console.log("Analyzing results...\n");
  exports.throughput(input, output);
  exports.profit(input, output);
  exports.waitTime(input, output);
  console.log("------------------------\n");
};

exports.throughput = function(input,output) {
  var potentialThroughput = input.length;
  var throughput = output.length;
  var percentThroughput = Math.floor(100 * throughput / potentialThroughput);
  var analysis = 
    "Throughput Analysis:" +
    "\n\tPotential Throughput\t" + potentialThroughput +
    "\n\tActual Throughput\t"    + throughput +
    "\n\tPercentage Throughput\t" + percentThroughput + "%\n";

  console.log(analysis);
};

exports.profit = function(input, output) {
  var potentialProfit = profit = 0;

  input.forEach(function(order) {
    potentialProfit += menu[order.type].profit;
  });

  output.forEach(function(order) {
    profit += menu[input[order.order_id].type].profit;
  });

  var percentProfit = Math.floor(100 * profit / potentialProfit);
  var analysis =
    "Profit Analysis:" +
    "\n\tPotential Profit\t" + potentialProfit +
    "\n\tActual Profit\t\t"    + profit +
    "\n\tPercentage Profit\t" + percentProfit + "%\n";

  console.log(analysis);
};

exports.waitTime = function(input, output) {
  var totalWaitTime = 0;
  
  output.forEach(function(order) {
    totalWaitTime += order.start_time - input[order.order_id].order_time;
  });

  console.log("Average Wait Time:\t\t" + (totalWaitTime / output.length).toFixed(2) + "\n");
}

