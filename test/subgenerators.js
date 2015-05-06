'use strict';
var util = require('./test-utility');

/*
 * Test for all subgenerators NOT requiring a name argument
 */
describe('Subgenerators without arguments tests', function() {

  describe('aspnet:PackageJson', function() {
    util.goCreate('PackageJson');
    util.fileCheck('should create package json file', 'package.json');
  });

  describe('aspnet:Gulpfile', function() {
    util.goCreate('Gulpfile');
    util.fileCheck('should create gulp file', 'gulpfile.js');
  });

  describe('aspnet:BowerJson', function() {
    util.goCreate('BowerJson');
    util.fileCheck('should create bower file', 'bower.json');
  });

  describe('aspnet:Config', function() {
    util.goCreate('Config');
    util.fileCheck('should create config json file', 'config.json');
  });

  describe('aspnet:StartupClass', function() {
    util.goCreate('StartupClass');
    util.fileCheck('should create Startup.cs file', 'Startup.cs');
  });

  describe('aspnet:gitignore', function() {
    util.goCreate('gitignore');
    util.fileCheck('should create .gitignore file', '.gitignore');
  });
});

/*
 * Test for all subgenerators requiring a name argument
 */
describe('Subgenerators with named arguments tests', function() {

  describe('aspnet:Class', function() {
    var arg = 'MyClass';
    var filename = 'MyClass.cs';

    util.goCreateWithArgs('Class', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);

  });

  describe('aspnet:CoffeeScript', function() {
    var arg = 'file';
    var filename = 'file.coffee';

    util.goCreateWithArgs('CoffeeScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:Gruntfile', function() {
    var arg = 'gruntfile';
    var filename = 'gruntfile.js';

    util.goCreateWithArgs('Gruntfile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:HTMLPage', function() {
    var arg = 'mypage';
    var filename = 'mypage.html';

    util.goCreateWithArgs('HTMLPage', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:JavaScript', function() {
    var arg = 'file';
    var filename = 'file.js';

    util.goCreateWithArgs('JavaScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:JSON', function() {
    var arg = 'file';
    var filename = 'file.json';

    util.goCreateWithArgs('JSON', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:MvcController', function() {
    var arg = 'file';
    var filename = 'file.cs';

    util.goCreateWithArgs('MvcController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:MvcView', function() {
    var arg = 'file';
    var filename = 'file.cshtml';

    util.goCreateWithArgs('MvcView', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:TextFile', function() {
    var arg = 'file';
    var filename = 'file.txt';

    util.goCreateWithArgs('TextFile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:TypeScript', function() {
    var arg = 'file';
    var filename = 'file.ts';

    util.goCreateWithArgs('TypeScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:WebApiController', function() {
    var arg = 'file';
    var filename = 'file.cs';

    util.goCreateWithArgs('WebApiController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });
});
