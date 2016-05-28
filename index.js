require('dotenv').load();
var path = require('path');
var SocketCluster = require('socketcluster').SocketCluster;

var config = require(path.join(__dirname, 'config'));

var onlineUsers = require(path.join(__dirname, 'online'));
var db = require(path.join(__dirname, 'db'));
db.users.testConnection()
.then(onlineUsers.logOptions)
.then(onlineUsers.clear)
.then(function() {
  return new Promise(function(resolve, reject) {
    var socketCluster = new SocketCluster({
      authKey: config.authKey,
      workers: config.workers,
      brokers: config.brokers,
      wsEngine: config.wsEngine,
      protocol: config.protocol,
      protocolOptions: config.protocolOptions,
      port: config.port,
      host: config.host,
      appName: 'myapp',
      workerController: 'worker.js',
      brokerController: 'broker.js',
      allowClientPublish: false
    });
  });
})
.catch(console.log);
