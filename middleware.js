var path = require('path');
var _ = require('lodash');
var db = require(path.join(__dirname, 'db'));
var helper = require(path.join(__dirname, 'helper'));

var middleware = module.exports = {};
middleware.subscribe = function(req, next) {
  var channel = helper.parseChannel(req.channel);
  var token = req.socket.getAuthToken();

  if (channel) {
    if (token) {
      db.users.find(token.userId).then(function(dbUser) {
        // check for user channel
        if (channel['type'] === 'user' && channel['id'] === dbUser.id) {
          next();
        }
        // check for role channel
        else if (channel['type'] === 'role' && _.some(dbUser.roles, helper.roleChannelLookup(channel['id']))) {
          next();
        }
        else {
          next('MIDDLEWARE_SUBSCRIBE: Unauthorized channel ' + req.channel);
        }
      })
      .catch(function(err) {
        next('MIDDLEWARE_SUBSCRIBE: ' + err);
      });
    }
    else {
      next('MIDDLEWARE_SUBSCRIBE: Missing token.');
    }
  }
  else {
    next('MIDDLEWARE_SUBSCRIBE: Invalid channel format ', req.channel);
  }
};

