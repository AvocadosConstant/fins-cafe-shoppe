var exports = module.exports = {};
var menu = require("./menu.js");
var heap = require("fastpriorityqueue");
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

  // Represents the two baristas
  // baristas[i] = the time barista[i] will be available
  var baristas = [0, 0];
  var output = [];

  // Initialize a max heap prioritizing orders with the greatest value
  var queuedOrders = new heap(function(a, b) {
    return menu[a.type].value < menu[a.type].value;
  });

  var time = 0;
  while(time <= MAX_TIME && (input.length > 0 || queuedOrders.size > 0)) {

    //console.log( "Time:\t" + time + "\n# orders left:\t" + input.length);

    while(input.length > 0 && input[0].order_time == time) {
      queuedOrders.add(input.shift());
      //console.log("Queued up an order!");
    }

    for(var i = 0; i < baristas.length; i++) {

      // Verify input are queued and check if barista is available
      if(queuedOrders.size > 0 && baristas[i] <= time) {

        // Pop most valuable queued order
        var deployingOrder = queuedOrders.poll();

        //console.log("Deploying Order of a " + deployingOrder.type);

        // Update next time barista is available
        baristas[i] = time + menu[deployingOrder.type].brew_time;

        output.push({
          "barista_id": i + 1,
          "start_time": time,
          "order_id": deployingOrder.order_id
        });
      }
    }
    time++;
  }
  return output;
};
