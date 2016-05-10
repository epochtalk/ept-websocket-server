var _ = require('lodash');
var Promise = require('bluebird');
var path = require('path');
var config = require(path.join(__dirname, 'config'));
var redis = Promise.promisifyAll(require('redis'));
var redisClient = redis.createClient(config.redis);

var online = module.exports = {};

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
  return redisClient.delAsync('websocket-users');
};

online.show = function() {
  return redisClient.lrangeAsync('websocket-users', 0, -1)
  .map(function(user) {
    return JSON.parse(user);
  });
};

online.get = function() {
  return redisClient.lrangeAsync('websocket-users', 0, -1)
  .map(function(user) {
    return JSON.parse(user);
  })
  .then(function(users) {
    return uniqueUsers(users);
  });
};

online.add = function(user) {
  return redisClient.lpushAsync(['websocket-users', JSON.stringify(user)]);
};

online.remove = function(user) {
  return redisClient.lremAsync('websocket-users', 0, JSON.stringify(user));
};
