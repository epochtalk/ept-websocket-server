var path = require('path');
var config = require(path.join(__dirname, 'config'));

var middleware = require(path.join(__dirname, 'middleware'));

module.exports.run = function(worker) {
  var scServer = worker.scServer;

  // authorize subscriptions
  scServer.addMiddleware(scServer.MIDDLEWARE_SUBSCRIBE, middleware.subscribe);

  scServer.on('connection', function(socket) {
    console.log('CONNECTION: connected to', process.pid);
    socket.on('notify', function(options) {
      // don't allow API key to be sent to client
      var APIKey = options.APIKey;
      delete options.APIKey;

      if (APIKey === config.APIKey) {
        scServer.exchange.publish(options.channel, options.data);
      }
    });
    socket.on('disconnect', function() {
      console.log('DISCONNECT:', process.pid);
    });
    socket.on('error', function(error) {
      console.log('SocketError:', error.message);
    });
  });
};
