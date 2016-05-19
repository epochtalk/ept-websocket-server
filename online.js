var _ = require('lodash');
var Promise = require('bluebird');
var path = require('path');
var config = require(path.join(__dirname, 'config'));
var helper = require(path.join(__dirname, 'helper'));
var redis = Promise.promisifyAll(require('redis'));
var redisClient = redis.createClient(config.redis);
var dbPrefix = 'websocket-users';

var online = module.exports = {};

// create and expose redis subscriber
var redisSub = redis.createClient(config.redis);
redisSub.subscribe(config.redisChannels.onlineUsersChannel);
online.subscriptionClient = redisSub;

function uniqueUsers(users) {
  return _(users).uniqBy('userId').map('userId').value();
}

function nonUniqueUsers(users) {
  return users;
}

online.logOptions = function() {
  console.log(config.redis);
};

online.quit = function() {
  return redisClient.quit();
};

online.clear = function() {
  return redisClient.delAsync(dbPrefix);
};

// returns all matching users with broker id's
online.show = function() {
  return redisClient.lrangeAsync(dbPrefix, 0, -1)
  .map(function(user) {
    return helper.parseJSON(user);
  });
};

online.get = function() {
  return redisClient.lrangeAsync(dbPrefix, 0, -1)
  .map(function(user) {
    var parsedUser = helper.parseJSON(user);
    // selectively return fields
    return {
      userId: parsedUser.userId
    };
  })
  .then(function(users) {
    return uniqueUsers(users);
  });
};

online.add = function(user) {
  return redisClient.lpushAsync([dbPrefix, JSON.stringify(user)]);
};

online.remove = function(user) {
  return redisClient.lremAsync(dbPrefix, 0, JSON.stringify(user));
};

online.publish = function(channel, message) {
  redisClient.publish(channel, message);
};
