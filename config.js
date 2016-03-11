var os = require('os');

module.exports = {
  workers: os.cpus().length,
  port: process.env.WEBSOCKET_PORT,
  host: process.env.WEBSOCKET_HOST,
  epochtalkURL: process.env.EPOCHTALK_URL || 'http://localhost:8080'
};
