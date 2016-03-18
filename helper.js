var path = require('path');
var request = require('request');
var epochtalk = require(path.join(__dirname, 'epochtalk'));

module.exports = {
  authenticateUser: function(token) {
    return new Promise(function(resolve, reject) {
      var options = {
        url: epochtalk.authenticate,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
      request(options, function(error, response, body) {
        try {
          var userData = JSON.parse(body);
        }
        catch(e) {
          reject(e);
        }
        if (error) {
          reject(error);
        }
        else if(userData.error) {
          reject(userData.error);
        }
        else {
          resolve(userData);
        }
      });
    });
  }
};
