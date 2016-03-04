require('dotenv').load();
var os = require('os');
var SocketCluster = require('socketcluster').SocketCluster;

var socketCluster = new SocketCluster({
  workers: os.cpus().length,
  brokers: 3,
  port: process.env.SOCKETCLUSTER_PORT,
  appName: 'myapp',
  workerController: 'worker.js'
});
