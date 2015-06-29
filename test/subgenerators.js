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
    util.fileContentCheck('gulpfile.js', 'file content check', /gulp\.task\('default'/);
  });

  describe('aspnet:Gruntfile', function() {
    util.goCreate('Gruntfile');
    util.fileCheck('should create Grunt file', 'Gruntfile.js');
  });

  describe('aspnet:BowerJson', function() {
    util.goCreate('BowerJson');
    util.fileCheck('should create bower configuration file', '.bowerrc');
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

  describe('aspnet:TypeScriptConfig', function() {
    util.goCreate('TypeScriptConfig');
    util.fileCheck('should create tsconfig.json file', 'tsconfig.json');
  });

});

/*
 * Test for all subgenerators requiring a name argument
 */
describe('Subgenerators with named arguments tests', function() {

  describe('aspnet:AngularController', function() {
    var arg = 'HomeController';
    var filename = 'HomeController.js';
    util.goCreateWithArgs('AngularController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /\$scope.title/);
  });

  describe('aspnet:AngularControllerAs', function() {
    var arg = 'HomeController';
    var filename = 'HomeController.js';
    util.goCreateWithArgs('AngularControllerAs', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /vm.title/);
  });

  describe('aspnet:AngularDirective', function() {
    var arg = 'HomeComponentDirective';
    var filename = 'HomeComponentDirective.js';
    util.goCreateWithArgs('AngularDirective', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /directive.\$inject/);
  });

  describe('aspnet:AngularFactory', function() {
    var arg = 'MyService';
    var filename = 'MyService.js';
    util.goCreateWithArgs('AngularFactory', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /factory.\$inject/);
  });

  describe('aspnet:AngularModule', function() {
    var arg = 'MyApplication';
    var filename = 'MyApplication.js';
    util.goCreateWithArgs('AngularModule', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /angular.module/);
  });

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

  describe('aspnet:HTMLPage', function() {
    var arg = 'mypage';
    var filename = 'mypage.html';
    util.goCreateWithArgs('HTMLPage', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:Interface', function() {
    var arg = 'IContact';
    var filename = 'IContact.cs';
    util.goCreateWithArgs('Interface', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*interface[ ]*IContact/);
  });

  describe('aspnet:JSONSchema', function() {
    var arg = 'MySchema';
    var filename = 'MySchema.json';
    util.goCreateWithArgs('JSONSchema', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /my MySchema JSON format/);
  });

  describe('aspnet:Middleware', function() {
    var arg = 'MyMiddleware';
    var filename = 'MyMiddleware.cs';

    util.goCreateWithArgs('Middleware', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyMiddleware/);
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

  describe('aspnet:JSX', function() {
    var arg = 'file';
    var filename = 'file.jsx';
    util.goCreateWithArgs('JSX', [arg]);
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

  describe('aspnet:Class', function() {
    var arg = 'CartTagHelper';
    var filename = 'CartTagHelper.cs';
    util.goCreateWithArgs('TagHelper', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*CartTagHelper/);
  });

  describe('aspnet:StyleSheetSCSS', function() {
    var arg = '_base';
    var filename = '_base.scss';
    util.goCreateWithArgs('StyleSheetSCSS', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:StyleSheet', function() {
    var arg = 'style';
    var filename = 'style.css';
    util.goCreateWithArgs('StyleSheet', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:StyleSheetLess', function() {
    var arg = '_base';
    var filename = '_base.less';
    util.goCreateWithArgs('StyleSheetLess', [arg]);
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
