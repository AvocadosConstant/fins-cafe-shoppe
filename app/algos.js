var exports = module.exports = {};
var menu = require("./menu.js");
var MAX_TIME = 100;

// Basic FIFO implementation of order allocation
// Not optimized at all
exports.fifo = function(input) {
  // Represents the two baristas
  // baristas[i] = the time barista[i] will be available
  var baristas = [0, 0];
  var output = [];

  // Traverse each order
  input.forEach(function(order) {
    // Determine which barista will be free earliest
    var chosenBarista = baristas[1] < baristas[0] ? 1 : 0;

    // Start time is the greater of the order time and the baristas available time
    var startTime = baristas[chosenBarista] < order.order_time ?
      order.order_time :
      baristas[chosenBarista];

    // End of the day, closing shop
    if(startTime > MAX_TIME) return output;

    // Update next time barista is available
    baristas[chosenBarista] = startTime + menu[order.type].brew_time;

    output.push({
      "barista_id": chosenBarista + 1,
      "start_time": startTime,
      "order_id": order.order_id
    });
  });

  return output;
};

// Tim's implementation of order allocation
exports.tims = function(input) {
  return output;
};
