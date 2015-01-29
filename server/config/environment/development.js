'use strict';

var path = require('path');

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/test-dev'
  },

  seedDB: true,

  storage: {
    fs: {
      root: path.normalize(__dirname + '/../../../storage')
    }
  }

};
