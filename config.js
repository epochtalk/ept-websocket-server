var os = require('os');
var fs = require('fs');

module.exports = {
  authKey: process.env.PRIVATE_KEY,
  workers: os.cpus().length,
  port: process.env.WEBSOCKET_PORT,
  host: process.env.WEBSOCKET_HOST,
  protocol: process.env.WEBSOCKET_PROTOCOL,
  protocolOptions: {
    key: fs.readFileSync(__dirname + '/keys/server.key', 'utf8'),
    cert: fs.readFileSync(__dirname + '/keys/server.crt', 'utf8'),
    passphrase: process.env.WEBSOCKET_PASS
  },
  APIKey: process.env.WEBSOCKET_API_KEY
};
