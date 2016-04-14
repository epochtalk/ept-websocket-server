var os = require('os');

module.exports = {
  authKey: process.env.PRIVATE_KEY,
  workers: os.cpus().length,
  port: process.env.WEBSOCKET_PORT,
  host: process.env.WEBSOCKET_HOST,
  protocol: process.env.WEBSOCKET_PROTOCOL,
  protocolOptions: {
    cert: process.env.WEBSOCKET_CERT,
    key: process.env.WEBSOCKET_KEY,
    passphrase: process.env.WEBSOCKET_PASS
  },
  APIKey: process.env.WEBSOCKET_API_KEY
};
