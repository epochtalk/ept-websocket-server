var path = require('path');
var URI = require('urijs');

var config = require(path.join(__dirname, 'config'));
var epochtalkURL = config.epochtalkURL;

module.exports = {
  authenticate: URI(epochtalkURL).path('/api/authenticate').normalize().toString()
};
