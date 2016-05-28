var os = require('os');
var fs = require('fs');
var path = require('path');

module.exports = {
  authKey: process.env.PRIVATE_KEY,
  workers: os.cpus().length,
  brokers: os.cpus().length,
  port: process.env.WEBSOCKET_PORT,
  host: process.env.WEBSOCKET_HOST,
  protocol: process.env.WEBSOCKET_PROTOCOL,
  protocolOptions: {
    key: fs.readFileSync(path.join(__dirname, 'keys', process.env.WEBSOCKET_KEY_NAME), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'keys', process.env.WEBSOCKET_CERT_NAME), 'utf8'),
    passphrase: process.env.WEBSOCKET_PASS
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB
  },
  redisChannels: {
    onlineUsersChannel: 'online-users'
  },
  APIKey: process.env.WEBSOCKET_API_KEY
};
