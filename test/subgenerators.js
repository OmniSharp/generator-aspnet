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
    util.fileContentCheck('gulpfile.js', 'file content check', /gulp\.task\("default"/);
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

  describe('aspnet:AppSettings', function() {
    util.goCreate('AppSettings');
    util.fileCheck('should create appsettings json file', 'appsettings.json');
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

  describe('aspnet:Dockerfile Mono-based', function() {
    var filename = 'Dockerfile';
    util.goCreate(filename);
    util.fileCheck('should create Dockerfile', filename);
    util.fileContentCheck(filename, 'Check the content for Mono-based image tag', /FROM microsoft\/aspnet:1\.0\.0-rc1-update1/);
  });

  describe('aspnet:Dockerfile CoreCLR-based', function() {
    var arg = '--coreclr';
    var filename = 'Dockerfile';
    util.goCreateWithArgs(filename, [arg]);
    util.fileCheck('should create Dockerfile', filename);
    util.fileContentCheck(filename, 'Check the content for CoreCLR-based image tag', /FROM microsoft\/aspnet:1\.0\.0-rc1-update1-coreclr/);
  });

  describe('aspnet:nuget', function() {
    util.goCreate('nuget');
    var filename = 'NuGet.config';
    util.fileCheck('should create NuGet configuration file', filename);
    util.fileContentCheck(filename, 'Check file content', /api\.nuget\.org/);
  });

  // unstable feed cannot be found in generated file
  describe('aspnet:nuget', function() {
    util.goCreate('nuget');
    var filename = 'NuGet.config';
    util.fileCheck('should create NuGet configuration file', filename);
    util.fileContentCheck(filename, 'Check file content', /api\.nuget\.org/);
    util.noFileContentCheck(filename, 'Check file content for no unstable feed', /https:\/\/myget\.org\/f\/aspnetrc1\/api\/v2/);
  });

  // unstable feed should be found in generated file
  describe('aspnet:nuget --unstable', function() {
    var arg = '--unstable';
    var filename = 'NuGet.config';
    util.goCreateWithArgs('nuget', [arg]);
    util.fileCheck('should create ' + filename + ' file with unstable feed', filename);
    util.fileContentCheck(filename, 'Check file content for unstable feed', /https:\/\/myget\.org\/f\/aspnetrc1\/api\/v2/);
  });

  describe('aspnet:readme creates README.md', function() {
    util.goCreate('readme');
    var filename = 'README.md';
    util.fileCheck('should create README.md documentation file', filename);
    util.fileContentCheck(filename, 'Check file content', /^# MyNamespace$/m);
  });

  describe('aspnet:readme with --txt option creates README.txt', function() {
    var arg = '--txt';
    util.goCreateWithArgs('readme', [arg]);
    var filename = 'README.txt';
    util.fileCheck('should create README.txt documentation file', filename);
    util.fileContentCheck(filename, 'Check file content', /^# MyNamespace$/m);
  });

  describe('aspnet:readme in cwd of project.json should contain correct project name', function() {
    var dir = util.makeTempDir();
    util.goCreateApplication('classlib', 'emptyTest', dir);
    util.goCreate('readme', path.join(dir, 'emptyTest'));
    util.fileCheck('should create README.md file', 'README.md');
    util.fileContentCheck('README.md', 'file content check', /^# emptyTest$/m);
  });

  describe('aspnet:readme with --txt option in cwd of project.json should contain correct project name', function() {
    var arg = '--txt';
    var dir = util.makeTempDir();
    util.goCreateApplication('classlib', 'emptyTest', dir);
    util.goCreateWithArgs('readme', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create README.txt file', 'README.txt');
    util.fileContentCheck('README.txt', 'file content check', /^# emptyTest$/m);
  });

});

/*
 * Test for all subgenerators requiring a name argument
 */
describe('Subgenerators with named arguments tests', function() {

  describe('aspnet:AngularController without extension', function() {
    var arg = 'HomeController';
    var filename = 'HomeController.js';
    util.goCreateWithArgs('AngularController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /\$scope.title/);
  });

  describe('aspnet:AngularController with extension', function() {
    var filename = 'HomeController.js';
    util.goCreateWithArgs('AngularController', [filename]);
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

  describe('aspnet:AngularControllerAs without extension', function() {
    var arg = 'HomeController';
    var filename = 'HomeController.js';
    util.goCreateWithArgs('AngularControllerAs', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /vm.title/);
  });

  describe('aspnet:AngularControllerAs with extension', function() {
    var filename = 'HomeController.js';
    util.goCreateWithArgs('AngularControllerAs', [filename]);
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

  describe('aspnet:AngularDirective without extension', function() {
    var arg = 'HomeComponentDirective';
    var filename = 'HomeComponentDirective.js';
    util.goCreateWithArgs('AngularDirective', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /directive.\$inject/);
  });

  describe('aspnet:AngularDirective with extension', function() {
    var filename = 'HomeComponentDirective.js';
    util.goCreateWithArgs('AngularDirective', [filename]);
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

  describe('aspnet:AngularFactory without extension', function() {
    var arg = 'MyService';
    var filename = 'MyService.js';
    util.goCreateWithArgs('AngularFactory', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /factory.\$inject/);
  });

  describe('aspnet:AngularFactory with extension', function() {
    var filename = 'MyService.js';
    util.goCreateWithArgs('AngularFactory', [filename]);
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

  describe('aspnet:AngularModule without extension', function() {
    var arg = 'MyApplication';
    var filename = 'MyApplication.js';
    util.goCreateWithArgs('AngularModule', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /angular.module/);
  });

  describe('aspnet:AngularModule with extension', function() {
    var filename = 'MyApplication.js';
    util.goCreateWithArgs('AngularModule', [filename]);
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

  describe('aspnet:Class without extension', function() {
    var arg = 'MyClass';
    var filename = 'MyClass.cs';
    util.goCreateWithArgs('Class', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);
  });

  describe('aspnet:Class with extension', function() {
    var filename = 'MyClass.cs';
    util.goCreateWithArgs('Class', [filename]);
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

  describe('aspnet:CoffeeScript without extension', function() {
    var arg = 'file';
    var filename = 'file.coffee';
    util.goCreateWithArgs('CoffeeScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:CoffeeScript with extension', function() {
    var filename = 'file.coffee';
    util.goCreateWithArgs('CoffeeScript', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:HTMLPage without extension', function() {
    var arg = 'mypage';
    var filename = 'mypage.html';
    util.goCreateWithArgs('HTMLPage', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:HTMLPage with extension', function() {
    var filename = 'mypage.html';
    util.goCreateWithArgs('HTMLPage', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:Interface without extension', function() {
    var arg = 'IContact';
    var filename = 'IContact.cs';
    util.goCreateWithArgs('Interface', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*interface[ ]*IContact/);
  });

  describe('aspnet:Interface with extension', function() {
    var filename = 'IContact.cs';
    util.goCreateWithArgs('Interface', [filename]);
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

  describe('aspnet:JSONSchema without extension', function() {
    var arg = 'MySchema';
    var filename = 'MySchema.json';
    util.goCreateWithArgs('JSONSchema', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /my MySchema JSON format/);
  });

  describe('aspnet:JSONSchema with extension', function() {
    var filename = 'MySchema.json';
    util.goCreateWithArgs('JSONSchema', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /my MySchema JSON format/);
  });

  describe('aspnet:Middleware without extension', function() {
    var arg = 'MyMiddleware';
    var filename = 'MyMiddleware.cs';
    util.goCreateWithArgs('Middleware', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyMiddleware/);
  });

  describe('aspnet:Middleware with extension', function() {
    var filename = 'MyMiddleware.cs';
    util.goCreateWithArgs('Middleware', [filename]);
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

  describe('aspnet:JavaScript without extension', function() {
    var arg = 'file';
    var filename = 'file.js';
    util.goCreateWithArgs('JavaScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:JavaScript with extension', function() {
    var filename = 'file.js';
    util.goCreateWithArgs('JavaScript', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:JSON without extension', function() {
    var arg = 'file';
    var filename = 'file.json';
    util.goCreateWithArgs('JSON', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:JSON with extension', function() {
    var filename = 'file.json';
    util.goCreateWithArgs('JSON', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:JSX without extension', function() {
    var arg = 'file';
    var filename = 'file.jsx';
    util.goCreateWithArgs('JSX', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:JSX with extension', function() {
    var arg = 'file';
    var filename = 'file.jsx';
    util.goCreateWithArgs('JSX', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:MvcController without extension', function() {
    var arg = 'file';
    var filename = 'file.cs';
    util.goCreateWithArgs('MvcController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:MvcController with extension', function() {
    var filename = 'file.cs';
    util.goCreateWithArgs('MvcController', [filename]);
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

  describe('aspnet:MvcView without extension', function() {
    var arg = 'file';
    var filename = 'file.cshtml';
    util.goCreateWithArgs('MvcView', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:MvcView with extension', function() {
    var filename = 'file.cshtml';
    util.goCreateWithArgs('MvcView', [filename]);
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

  describe('aspnet:Class without extension', function() {
    var arg = 'CartTagHelper';
    var filename = 'CartTagHelper.cs';
    util.goCreateWithArgs('TagHelper', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*CartTagHelper/);
  });

  describe('aspnet:Class with extension', function() {
    var filename = 'CartTagHelper.cs';
    util.goCreateWithArgs('TagHelper', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*CartTagHelper/);
  });

  describe('aspnet:StyleSheetSCSS without extension', function() {
    var arg = '_base';
    var filename = '_base.scss';
    util.goCreateWithArgs('StyleSheetSCSS', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:StyleSheetSCSS with extension', function() {
    var filename = '_base.scss';
    util.goCreateWithArgs('StyleSheetSCSS', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:StyleSheet without extension', function() {
    var arg = 'style';
    var filename = 'style.css';
    util.goCreateWithArgs('StyleSheet', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:StyleSheet with extension', function() {
    var filename = 'style.css';
    util.goCreateWithArgs('StyleSheet', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:StyleSheetLess without extension', function() {
    var arg = '_base';
    var filename = '_base.less';
    util.goCreateWithArgs('StyleSheetLess', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:StyleSheetLess with extension', function() {
    var filename = '_base.less';
    util.goCreateWithArgs('StyleSheetLess', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:TextFile without extension', function() {
    var arg = 'file';
    var filename = 'file.txt';
    util.goCreateWithArgs('TextFile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:TextFile with extension', function() {
    var filename = 'file.txt';
    util.goCreateWithArgs('TextFile', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:TypeScript without extension', function() {
    var arg = 'file';
    var filename = 'file.ts';
    util.goCreateWithArgs('TypeScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:TypeScript with extension', function() {
    var filename = 'file.ts';
    util.goCreateWithArgs('TypeScript', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:TypeScriptJSX without extension', function() {
    var arg = 'file';
    var filename = 'file.tsx';
    util.goCreateWithArgs('TypeScriptJSX', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:TypeScriptJSX with extension', function() {
    var filename = 'file.tsx';
    util.goCreateWithArgs('TypeScriptJSX', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:WebApiController without extension', function() {
    var arg = 'file';
    var filename = 'file.cs';
    util.goCreateWithArgs('WebApiController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:WebApiController with extension', function() {
    var filename = 'file.cs';
    util.goCreateWithArgs('WebApiController', [filename]);
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

  // now some tests to check if we correctly handle using named subgenerators
  // with commonly used scenario: having config.default.json or config.default
  // lets create config.default.json.txt and config.default.txt
  describe('aspnet:TextFile creates config.default.json.txt from config.default.json', function() {
    var arg = 'config.default.json';
    var filename = 'config.default.json.txt';
    util.goCreateWithArgs('TextFile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
  describe('aspnet:TextFile creates config.default.txt from config.default', function() {
    var arg = 'config.default';
    var filename = 'config.default.txt';
    util.goCreateWithArgs('TextFile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  // now some test for development/stating/production config.json
  describe('aspnet:TextFile creates config.development.json from config.development', function() {
    var arg = 'config.development';
    var filename = 'config.development.json';
    util.goCreateWithArgs('JSON', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
  describe('aspnet:TextFile creates config.staging.json from config.staging', function() {
    var arg = 'config.staging';
    var filename = 'config.staging.json';
    util.goCreateWithArgs('JSON', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
  describe('aspnet:TextFile creates config.staging.json from config.staging.json', function() {
    var arg = 'config.staging.json';
    var filename = 'config.staging.json';
    util.goCreateWithArgs('JSON', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
});
