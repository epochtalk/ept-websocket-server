var path = require('path');
var config = require(path.join(__dirname, 'config'));

module.exports.run = function(broker) {
  console.log(broker.dataMap);
  // broker.subscribe(JSON.stringify({ type: 'broker' })).watch(function(data) {
  //   console.log(data);
  // });
  console.log(broker.subscriptions);
};
