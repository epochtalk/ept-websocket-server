var path = require('path');
var config = require(path.join(__dirname, 'config'));

var middleware = require(path.join(__dirname, 'middleware'));
var handlers = require(path.join(__dirname, 'handlers'));

module.exports.run = function(worker) {
  var scServer = worker.scServer;

  // authorize subscriptions
  scServer.addMiddleware(scServer.MIDDLEWARE_SUBSCRIBE, middleware.subscribe);

  scServer.on('connection', function(socket) {
    socket.on('subscribe', function(channel) {
      handlers.postprocessSubscribe({ socketId: socket.id, channel: channel});
    });
    console.log('CONNECTION: connected to', process.pid);
    socket.on('notify', function(options) {
      // don't allow API key to be sent to client
      var APIKey = options.APIKey;
      delete options.APIKey;

      if (APIKey === config.APIKey) {
        scServer.exchange.publish(options.channel, options.data);
      }
    });
    socket.on('deauthenticate', function() {
      socket.kickOut();
    });
    socket.on('disconnect', function() {
      handlers.postprocessDisconnect(socket);
      console.log('DISCONNECT:', process.pid);
    });
    socket.on('error', function(error) {
      console.log('SocketError:', error.message);
    });
  });
};
