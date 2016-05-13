var path = require('path');
var helper = require(path.join(__dirname, 'helper'));
var handlers = module.exports = {};

handlers.postprocessSubscribe = function(channel) {
  channel = helper.parseChannel(channel);
  console.log('SUBSCRIBED:', channel.type, channel.id);
  // postprocess subscriptions
};
