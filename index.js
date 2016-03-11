require('dotenv').load();
var path = require('path');
var SocketCluster = require('socketcluster').SocketCluster;

var config = require(path.join(__dirname, 'config'));

var socketCluster = new SocketCluster({
  authKey: config.authKey,
  workers: config.workers,
  brokers: 3,
  port: config.port,
  host: config.host,
  appName: 'myapp',
  workerController: 'worker.js',
  allowClientPublish: false
});
