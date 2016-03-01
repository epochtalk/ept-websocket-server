require('dotenv').load();
var SocketCluster = require('socketcluster').SocketCluster;

var socketCluster = new SocketCluster({
  workers: 3,
  brokers: 3,
  port: process.env.SOCKETCLUSTER_PORT,
  appName: 'myapp',
  workerController: 'worker.js'
});
