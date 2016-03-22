var path = require('path');
var config = require(path.join(__dirname, 'config'));

module.exports.run = function(worker) {
  var scServer = worker.scServer;

  // authorize subscriptions
  scServer.addMiddleware(scServer.MIDDLEWARE_SUBSCRIBE, function(req, next) {
    var token = req.socket.getAuthToken();
    if (token && req.channel === '/u/' + token.userId) {
      next();
    }
    else {
      next('MIDDLEWARE_SUBSCRIBE:' + req.channel + ' failed.');
    }
  });

  scServer.on('connection', function(socket) {
    console.log('CONNECTION: connected to', process.pid);
    socket.on('notify', function(options) {
      console.log('NOTIFY:', options.userId);
      if (options.APIKey === config.APIKey) {
        scServer.exchange.publish('/u/' + options.userId, options);
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
