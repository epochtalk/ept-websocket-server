var path = require('path');
var config = require(path.join(__dirname, 'config'));
var helper = require(path.join(__dirname, 'helper'));
var onlineUsers = require(path.join(__dirname, 'online'));

module.exports.run = function(broker) {
  broker.on('subscribe', function(channel) {
    var parsedChannel = helper.parseJSON(channel);
    if (parsedChannel.type === 'user') {
      console.log('BROKER SUBSCRIBE', parsedChannel.id);
      onlineUsers.add({ userId: parsedChannel.id, brokerId: broker.id });
      onlineUsers.show().then(function(online) {
        onlineUsers.publish(config.redisChannels.onlineUsersChannel, JSON.stringify(online));
      });
    }
  });
  broker.on('unsubscribe', function(channel) {
    var parsedChannel = helper.parseJSON(channel);
    if (parsedChannel.type === 'user') {
      console.log('BROKER UNSUBSCRIBE', parsedChannel.id);
      onlineUsers.remove({ userId: parsedChannel.id, brokerId: broker.id });
      onlineUsers.show().then(function(online) {
        broker.publish(JSON.stringify({ type: 'public' }), { onlineUsers: online });
      });
    }
  });
};
