var path = require('path');
var wss = require(path.join(__dirname, 'index.js'));
var envfile = path.join(__dirname, '.env');

wss.start(envfile);
