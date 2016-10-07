var exports = module.exports = {};
var menu = require("./menu.js");
var MAX_TIME = 100;

exports.fifo = function(input) {
  var output = [];
  var baristas = [0, 0];

  input.forEach(function(order) {
    var chosenBarista = baristas[1] < baristas[0] ? 1 : 0;

    var startTime = baristas[chosenBarista] < order.order_time ?
      order.order_time :
      baristas[chosenBarista];

    if(startTime > MAX_TIME) return output;

    baristas[chosenBarista] = startTime + menu[order.type].brew_time;

    output.push({
      "order_id": order.order_id,
      "start_time": startTime,
      "barista_id": chosenBarista + 1
    });
  });

  return output;
};
