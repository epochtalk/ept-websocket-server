require('dotenv').load();
var path = require('path');
var SocketCluster = require('socketcluster').SocketCluster;

var config = require(path.join(__dirname, 'config'));

var db = require(path.join(__dirname, 'db'));
db.users.testConnection()
.then(function() {
  return new Promise(function(resolve, reject) {
    var socketCluster = new SocketCluster({
      authKey: config.authKey,
      workers: config.workers,
      brokers: 3,
      protocol: config.protocol,
      protocolOptions: config.protocolOptions,
      port: config.port,
      host: config.host,
      appName: 'myapp',
      workerController: 'worker.js',
      allowClientPublish: false
    });
  });
})
.catch(console.log);
