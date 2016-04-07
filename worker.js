var _ = require('lodash');
var path = require('path');
var config = require(path.join(__dirname, 'config'));
var db = require(path.join(__dirname, 'db'));

module.exports.run = function(worker) {
  var scServer = worker.scServer;

  // authorize subscriptions
  scServer.addMiddleware(scServer.MIDDLEWARE_SUBSCRIBE, function(req, next) {
    var token = req.socket.getAuthToken();
    var roleChannelLookup = function(channel) {
      return function(role) {
        return channel === '/r/' + role.lookup;
      };
    };
    if (token) {
      db.users.find(token.userId).then(function(dbUser) {
        // check for user channel
        if (req.channel === '/u/' + dbUser.id) {
          next();
        }
        // check for role channel
        else if (_.some(dbUser.roles, roleChannelLookup(req.channel))) {
          console.log('subscribed to roles channel', req.channel);
          next();
        }
        else {
          next('MIDDLEWARE_SUBSCRIBE: Unauthorized channel ' + req.channel);
        }
      })
      .catch(function(err) {
        console.log(err);
        next('MIDDLEWARE_SUBSCRIBE: User error.');
      });
    }
    else {
      next('MIDDLEWARE_SUBSCRIBE: Missing token.');
    }
  });

  scServer.on('connection', function(socket) {
    console.log('CONNECTION: connected to', process.pid);
    socket.on('notify', function(options) {
      // don't allow API key to be sent to client
      var APIKey = options.APIKey;
      delete options.APIKey;

      console.log('NOTIFY:', options.userId);
      if (APIKey === config.APIKey) {
        scServer.exchange.publish('/u/' + options.userId, options);
      }
    });
    socket.on('deauthenticate', function() {
      socket.kickOut();
    });
    socket.on('disconnect', function() {
      console.log('DISCONNECT:', process.pid);
    });
    socket.on('error', function(error) {
      console.log('SocketError:', error.message);
    });
  });
};
