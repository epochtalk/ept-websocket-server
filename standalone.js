var path = require('path');
var wss = require(path.join(__dirname, 'index.js'));
var envfile = path.join(__dirname, '.env');

function handleExit(opts, err) {
  return wss.exit(err);
}

wss.start(envfile)
// cleanup (process exit, flushes db)
.then(function() {
  process.on('exit', handleExit);
  process.on('SIGINT', handleExit);
  process.on('uncaughtException', handleExit);
});
