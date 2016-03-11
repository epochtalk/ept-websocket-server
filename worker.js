var path = require('path');
var helper = require(path.join(__dirname, 'helper'));

module.exports.run = function(worker) {
  console.log('hey, this is a debug from worker:', process.pid);
  var scServer = worker.scServer;

  scServer.on('connection', function(socket) {
    console.log('connected:', process.pid);
    var userToken = {
      valid: false
    };

    var interval = setInterval(function() {
      socket.emit('hello', 500);
    }, 1000);

    socket.on('register', function(token) {
      helper.authenticateUser(token)
      .then(function(userData) {
        console.log('registered:', userData.id);
        userToken.valid = true;
        userToken.token = token;
      })
      .catch(function() {
        console.log('failed to authenticate:', token);
        socket.disconnect();
      });
    });

    socket.on('disconnect', function() {
      clearInterval(interval);
    });

    socket.on('error', function(error) {
      console.log('error', error);
    });
  });
};
