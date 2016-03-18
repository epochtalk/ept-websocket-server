var os = require('os');

module.exports = {
  authKey: process.env.PRIVATE_KEY,
  workers: os.cpus().length,
  port: process.env.WEBSOCKET_PORT,
  host: process.env.WEBSOCKET_HOST,
  APIKey: process.env.WEBSOCKET_API_KEY
};
