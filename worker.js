module.exports.run = function(worker) {
  console.log('hey, this is a debug from worker:', process.pid);
  var scServer = worker.scServer;

  scServer.on('connection', function(socket) {
    console.log('hello:', process.pid);
    // socket.on('sampleClientEvent', function(data) {
    //   console.log('hey, this worker:', process.pid, 'received a sample event!');
    //   scServer.exchange.publish('sample');
    // });

    var interval = setInterval(function() {
      socket.emit('hello', 500);
    }, 1000);

    socket.on('disconnect', function() {
      clearInterval(interval);
    });
  });
};
