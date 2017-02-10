'use strict';
var util = require('./test-utility');
var path = require('path');

/*
 * Test for all subgenerators NOT requiring a name argument
 */
describe('Subgenerators without arguments tests', function() {

  describe('aspnet:nugetconfig', function() {
    util.goCreate('nugetconfig');
    var filename = 'nuget.config';
    util.fileCheck('should create NuGet configuration file', filename);
  });

  describe('aspnet:webconfig', function() {
    util.goCreate('webconfig');
    var filename = 'web.config';
    util.fileCheck('should create web.config configuration file', filename);
  });

});
