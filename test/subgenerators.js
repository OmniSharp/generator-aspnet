'use strict';
var util = require('./test-utility');
var path = require('path');

/*
 * Test for all subgenerators NOT requiring a name argument
 */
describe('Subgenerators without arguments tests', function() {

  describe('aspnet:PackageJson', function() {
    util.goCreate('PackageJson');
    util.fileCheck('should create package json file', 'package.json');
  });

  describe('aspnet:PackageJson in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('empty', 'emptyTest', dir);

    util.goCreate('PackageJson', path.join(dir, 'emptyTest'));
    util.fileCheck('should create package json file', 'package.json');
    util.fileContentCheck('package.json', 'file content check', '"name": "emptyTest"');
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

  describe('aspnet:BowerJson in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('empty', 'emptyTest', dir);

    util.goCreate('BowerJson', path.join(dir, 'emptyTest'));
    util.fileCheck('should create bower configuration file', '.bowerrc');
    util.fileCheck('should create bower file', 'bower.json');
    util.fileContentCheck('bower.json', 'file content check', '"name": "emptyTest"');
  });

  describe('aspnet:Config', function() {
    util.goCreate('Config');
    util.fileCheck('should create config json file', 'config.json');
  });

  describe('aspnet:StartupClass', function() {
    util.goCreate('StartupClass');
    util.fileCheck('should create Startup.cs file', 'Startup.cs');
  });

  describe('aspnet:StartupClass in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    util.goCreate('StartupClass', path.join(dir, 'emptyTest'));
    util.fileCheck('should create Startup.cs file', 'Startup.cs');
    util.fileContentCheck('Startup.cs', 'file content check', /^namespace emptyTest$/m);
  });

  describe('aspnet:gitignore', function() {
    util.goCreate('gitignore');
    util.fileCheck('should create .gitignore file', '.gitignore');
  });

  describe('aspnet:tfignore', function() {
    util.goCreate('tfignore');
    util.fileCheck('should create .tfignore file', '.tfignore');
  });

  describe('aspnet:TypeScriptConfig', function() {
    util.goCreate('TypeScriptConfig');
    util.fileCheck('should create tsconfig.json file', 'tsconfig.json');
  });

  describe('aspnet:Dockerfile', function() {
    util.goCreate('Dockerfile');
    util.fileCheck('should create Dockerfile', 'Dockerfile');
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

  describe('aspnet:AngularController in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'HomeController';
    var filename = 'HomeController.js';
    console.log(arg, dir);
    util.goCreateWithArgs('AngularController', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /\$scope.title/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:AngularControllerAs', function() {
    var arg = 'HomeController';
    var filename = 'HomeController.js';
    util.goCreateWithArgs('AngularControllerAs', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /vm.title/);
  });

  describe('aspnet:AngularControllerAs in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'HomeController';
    var filename = 'HomeController.js';
    console.log(arg, dir);
    util.goCreateWithArgs('AngularControllerAs', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /vm.title/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:AngularDirective', function() {
    var arg = 'HomeComponentDirective';
    var filename = 'HomeComponentDirective.js';
    util.goCreateWithArgs('AngularDirective', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /directive.\$inject/);
  });

  describe('aspnet:AngularDirective in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'HomeComponentDirective';
    var filename = 'HomeComponentDirective.js';
    console.log(arg, dir);
    util.goCreateWithArgs('AngularDirective', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /directive.\$inject/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:AngularFactory', function() {
    var arg = 'MyService';
    var filename = 'MyService.js';
    util.goCreateWithArgs('AngularFactory', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /factory.\$inject/);
  });

  describe('aspnet:AngularFactory in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'MyService';
    var filename = 'MyService.js';
    console.log(arg, dir);
    util.goCreateWithArgs('AngularFactory', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /factory.\$inject/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:AngularModule', function() {
    var arg = 'MyApplication';
    var filename = 'MyApplication.js';
    util.goCreateWithArgs('AngularModule', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /angular.module/);
  });

  describe('aspnet:AngularModule in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'MyApplication';
    var filename = 'MyApplication.js';
    console.log(arg, dir);
    util.goCreateWithArgs('AngularModule', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /angular.module/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\'');
  });

  describe('aspnet:Class', function() {
    var arg = 'MyClass';
    var filename = 'MyClass.cs';

    util.goCreateWithArgs('Class', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);
  });

  describe('aspnet:Class in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'MyClass';
    var filename = 'MyClass.cs';
    console.log(arg, dir);

    util.goCreateWithArgs('Class', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);
    util.fileContentCheck(filename, 'Check file content', 'namespace emptyTest');
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

  describe('aspnet:Interface in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'IContact';
    var filename = 'IContact.cs';
    console.log(arg, dir);
    util.goCreateWithArgs('Interface', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*interface[ ]*IContact/);
    util.fileContentCheck(filename, 'Check file content', 'namespace emptyTest');
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

  describe('aspnet:Middleware in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlib', 'emptyTest', dir);

    var arg = 'MyMiddleware';
    var filename = 'MyMiddleware.cs';
    console.log(arg, dir);

    util.goCreateWithArgs('Middleware', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyMiddleware/);
    util.fileContentCheck(filename, 'Check file content', 'namespace emptyTest');
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

  describe('aspnet:MvcController in cwd of project.json', function() {
    var arg = 'file';
    var filename = 'file.cs';
    var dir = util.makeTempDir();

    util.goCreateApplication('web', 'webTest', dir);
    util.goCreateWithArgs('MvcController', [arg], path.join(dir, 'webTest'));

    util.fileCheck('should create Controllers/' + filename + ' file', filename);
  });

  describe('aspnet:MvcView', function() {
    var arg = 'file';
    var filename = 'file.cshtml';

    util.goCreateWithArgs('MvcView', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

  describe('aspnet:MvcView in cwd of project.json', function() {
    var arg = 'file';
    var filename = 'file.cshtml';
    var dir = util.makeTempDir();

    util.goCreateApplication('web', 'webTest', dir);
    util.goCreateWithArgs('MvcView', [arg], path.join(dir, 'webTest'));
    util.fileCheck('should create Views/' + filename + ' file', filename);
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

  describe('aspnet:WebApiController in cwd of project.json', function() {
    var arg = 'file';
    var filename = 'file.cs';
    var dir = util.makeTempDir();

    util.goCreateApplication('web', 'webTest', dir);
    util.goCreateWithArgs('WebApiController', [arg], path.join(dir, 'webTest'));

    util.fileCheck('should create Controllers/' + filename + ' file', filename);
  });
});
