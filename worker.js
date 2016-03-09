module.exports.run = function(worker) {
  console.log('hey, this is a debug from worker:', process.pid);
  var scServer = worker.scServer;

  scServer.on('connection', function(socket) {
    console.log('hello:', process.pid);

    var interval = setInterval(function() {
      socket.emit('hello', 500);
    }, 1000);

    socket.on('disconnect', function() {
      clearInterval(interval);
    });

    socket.on('error', function(error) {
      console.log('error', error);
    });
  });
};
