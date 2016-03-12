var path = require('path');
var helper = require(path.join(__dirname, 'helper'));

module.exports.run = function(worker) {
  var scServer = worker.scServer;

  scServer.on('connection', function(socket) {
    console.log('connected:', process.pid);
    var user= {
      valid: false
    };

    var interval = setInterval(function() {
      if (user.valid) {
        user.channel.publish('refresh');
      }
    }, 10000);

    socket.on('register', function(token) {
      helper.authenticateUser(token)
      .then(function(userData) {
        user.channel = scServer.exchange.subscribe('/u/' + userData.id);
        user.valid = true;
        user.token = token;
        user.id = userData.id;
      })
      .catch(function() {
        console.log('failed to authenticate:', token);
        socket.disconnect();
      });
    });

    socket.on('disconnect', function() {
      console.log('disconnected:', process.pid);
      clearInterval(interval);
    });

    socket.on('error', function(error) {
      console.log('SocketError:', error.message);
    });
  });
};
