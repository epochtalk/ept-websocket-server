var path = require('path');
var onlineUsers = require(path.normalize(__dirname + '/plugins/online'));

function exit(err) {
  if (err) { console.log(err); }
  console.log('Flushing Online Users');
  return onlineUsers.clear()
  .then(function() { process.exit(); });
}

module.exports = {
  start: function(envPath) {
    require('dotenv').config({ path: envPath });
    var SocketCluster = require('socketcluster').SocketCluster;
    var db = require(path.normalize(__dirname + '/db'));
    var config = require(path.normalize(__dirname + '/config'));
    return db.users.testConnection()
    .then(onlineUsers.logOptions)
    .then(onlineUsers.clear)
    .then(function() {
      return new Promise(function(resolve) {
        var socketCluster = new SocketCluster({
          authKey: config.authKey,
          workers: config.workers,
          brokers: config.brokers,
          wsEngine: config.wsEngine,
          protocol: config.protocol,
          protocolOptions: config.protocolOptions,
          port: config.port,
          host: config.host,
          appName: 'ept-ws',
          workerController: path.normalize(__dirname + '/worker.js'),
          allowClientPublish: false
        });
        return resolve(socketCluster);
      });
    })
    .catch(console.log);
  },
  exit: function(err) { return exit(err); }
};
