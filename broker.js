var path = require('path');
var config = require(path.join(__dirname, 'config'));
var helper = require(path.join(__dirname, 'helper'));
var onlineUsers = require(path.join(__dirname, 'online'));

module.exports.run = function(broker) {
  broker.on('subscribe', function(channel) {
    var parsedChannel = helper.parseChannel(channel);
    if (parsedChannel.type === 'user') {
      onlineUsers.add({ userId: parsedChannel.id, brokerId: broker.id });
      onlineUsers.show().then(function(online) {
        console.log('BROKER SUBSCRIBE', parsedChannel.id);
      });
    }
  });
  broker.on('unsubscribe', function(channel) {
    var parsedChannel = helper.parseChannel(channel);
    if (parsedChannel.type === 'user') {
      onlineUsers.remove({ userId: parsedChannel.id, brokerId: broker.id });
      onlineUsers.show().then(function(online) {
        console.log('BROKER UNSUBSCRIBE', parsedChannel.id);
      });
    }
  });
};
