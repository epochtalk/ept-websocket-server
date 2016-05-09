var _ = require('lodash');
var onlineUsers = [];
var online = module.exports = {};

function uniqueUsers(users) {
  return _(users).uniqBy('userId').map('userId').value();
}

function nonUniqueUsers(users) {
  return users;
}

online.show = function() {
  return nonUniqueUsers(onlineUsers);
};

online.get = function() {
  return uniqueUsers(onlineUsers);
};

online.add = function(user) {
  onlineUsers.push(user);
  return uniqueUsers(onlineUsers);
};

online.remove = function(user) {
  _.remove(onlineUsers, function (onlineUser) {
    return onlineUser.userId === user.userId && onlineUser.socketId === user.socketId;
  });
  return uniqueUsers(onlineUsers);
};
