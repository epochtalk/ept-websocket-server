var path = require('path');
var helper = require(path.join(__dirname, 'helper'));
var onlineUsers = require(path.join(__dirname, 'online'));
var handlers = module.exports = {};

handlers.postprocessSubscribe = function(options) {
  var channel = options.channel;
  channel = helper.parseChannel(channel);
  console.log('SUBSCRIBED:', channel.type, channel.id);
  // postprocess subscriptions
  if (channel.type === 'user') {
    onlineUsers.add({ userId: channel.id, socketId: options.socketId });
  }
};

handlers.postprocessDisconnect = function(socket) {
  onlineUsers.remove({ userId: socket.getAuthToken().userId, socketId: socket.id });
};
