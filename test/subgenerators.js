'use strict';
var util = require('./test-utility');
var path = require('path');

/*
 * Test for all subgenerators NOT requiring a name argument
 */
describe('Subgenerators without arguments tests', function() {

  describe('aspnet:packagejson', function() {
    util.goCreate('packagejson');
    util.fileCheck('should create package json file', 'package.json');
  });

  describe('aspnet:packagejson in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('emptyweb', 'emptyWebTest', dir);

    util.goCreate('packagejson', path.join(dir, 'emptyWebTest'));
    util.fileCheck('should create package json file', 'package.json');
    util.fileContentCheck('package.json', 'file content check', '"name": "emptywebtest"');
  });

  describe('aspnet:program', function() {
    util.goCreate('program');
    util.fileCheck('should create Program.cs file', 'Program.cs');
  });

  describe('aspnet:gulpfile', function() {
    util.goCreate('gulpfile');
    util.fileCheck('should create gulp file', 'gulpfile.js');
    util.fileContentCheck('gulpfile.js', 'file content check', /gulp\.task\("default"/);
  });

  describe('aspnet:gruntfile', function() {
    util.goCreate('gruntfile');
    util.fileCheck('should create Grunt file', 'Gruntfile.js');
  });

  describe('aspnet:bowerjson', function() {
    util.goCreate('bowerjson');
    util.fileCheck('should create bower configuration file', '.bowerrc');
    util.fileCheck('should create bower file', 'bower.json');
  });

  describe('aspnet:bowerjson in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('emptyweb', 'emptyWebTest', dir);

    util.goCreate('bowerjson', path.join(dir, 'emptyWebTest'));
    util.fileCheck('should create bower configuration file', '.bowerrc');
    util.fileCheck('should create bower file', 'bower.json');
    util.fileContentCheck('bower.json', 'file content check', '"name": "emptyWebTest"');
  });

  describe('aspnet:appsettings', function() {
    util.goCreate('appsettings');
    util.fileCheck('should create appsettings json file', 'appsettings.json');
  });

  describe('aspnet:startup', function() {
    util.goCreate('startup');
    util.fileCheck('should create startup.cs file', 'Startup.cs');
  });

  describe('aspnet:startup in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    util.goCreate('startup', path.join(dir, 'emptyTest'));
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

  describe('aspnet:typescriptconfig', function() {
    util.goCreate('typescriptconfig');
    util.fileCheck('should create tsconfig.json file', 'tsconfig.json');
  });

  describe('aspnet:dockerfile has the same .NET version', function() {
    var sdkVersion = '1.1.0';
    var arg = 'file';
    var dir = util.makeTempDir();

    util.goCreateApplication('web', 'webTest', dir);
    util.goCreateWithArgs('mvccontroller', [arg], path.join(dir, 'webTest'));

    util.fileContentCheck('project.json', 'file content check', new RegExp('"Microsoft.NETCore.App":\\s*{\\s*"version": "' + sdkVersion + '"'));
    util.fileContentCheck('Dockerfile', 'Check the content for dotnet latest image tag', new RegExp('FROM microsoft\/dotnet:' + sdkVersion + '-sdk-projectjson\\b'));
    util.fileContentCheck('Dockerfile.nano', 'Check the content for dotnet nanoserver latest image tag', new RegExp('FROM microsoft\/dotnet:' + sdkVersion + '-sdk-projectjson-nanoserver\\b'));
  });

  /**
   * Dockerfile can be created with two versions:
   * - without SQLite installed
   * - with SQLite installed and EF migrations called
   */
  describe('aspnet:dockerfile dotnet', function() {
    var filename = 'Dockerfile';
    util.goCreate(filename.toLowerCase());
    util.fileCheck('should create Dockerfile', filename);
    util.fileContentCheck(filename, 'Check the content for dotnet latest image tag', /FROM microsoft\/dotnet:/);
    util.noFileContentCheck(filename, 'Does not contain SQLite install', /RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev/);
    util.noFileContentCheck(filename, 'Does not call database migrations', /RUN \["dotnet", "ef", "database", "update"\]/);
  });

  describe('aspnet:dockerfile dotnet with --sqlite', function() {
    var arg = '--sqlite';
    var filename = 'Dockerfile';
    util.goCreateWithArgs(filename.toLowerCase(), [arg]);
    util.fileCheck('should create Dockerfile', filename);
    util.fileContentCheck(filename, 'Check the content for dotnet latest image tag', /FROM microsoft\/dotnet:/);
    util.fileContentCheck(filename, 'Contains SQLite install', /RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev/);
    util.fileContentCheck(filename, 'Calls database migrations', /RUN \["dotnet", "ef", "database", "update"\]/);
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
    util.noFileContentCheck(filename, 'Check file content for no unstable feed', /https:\/\/dotnet\.myget\.org\/F\/aspnet1\/api\/v3/);
  });

  // unstable feed should be found in generated file
  describe('aspnet:nuget --unstable', function() {
    var arg = '--unstable';
    var filename = 'NuGet.config';
    util.goCreateWithArgs('nuget', [arg]);
    util.fileCheck('should create ' + filename + ' file with unstable feed', filename);
    util.fileContentCheck(filename, 'Check file content for unstable feed', /https:\/\/dotnet\.myget\.org\/F\/aspnet1\/api\/v3/);
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
    util.goCreateApplication('classlibrary', 'emptyTest', dir);
    util.goCreate('readme', path.join(dir, 'emptyTest'));
    util.fileCheck('should create README.md file', 'README.md');
    util.fileContentCheck('README.md', 'file content check', /^# emptyTest$/m);
  });

  describe('aspnet:readme with --txt option in cwd of project.json should contain correct project name', function() {
    var arg = '--txt';
    var dir = util.makeTempDir();
    util.goCreateApplication('classlibrary', 'emptyTest', dir);
    util.goCreateWithArgs('readme', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create README.txt file', 'README.txt');
    util.fileContentCheck('README.txt', 'file content check', /^# emptyTest$/m);
  });

});

/*
 * Test for all subgenerators requiring a name argument
 */
describe('Subgenerators with named arguments tests', function() {

  describe('aspnet:angularcontroller without extension', function() {
    var arg = 'HomeController';
    var filename = 'HomeController.js';
    util.goCreateWithArgs('angularcontroller', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /\$scope.title/);
  });

  describe('aspnet:angularcontroller with extension', function() {
    var filename = 'HomeController.js';
    util.goCreateWithArgs('angularcontroller', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /\$scope.title/);
  });

  describe('aspnet:angularcontroller in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'HomeController';
    var filename = 'HomeController.js';
    console.log(arg, dir);
    util.goCreateWithArgs('angularcontroller', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /\$scope.title/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:angularcontrolleras without extension', function() {
    var arg = 'HomeController';
    var filename = 'HomeController.js';
    util.goCreateWithArgs('angularcontrolleras', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /vm.title/);
  });

  describe('aspnet:angularcontrolleras with extension', function() {
    var filename = 'HomeController.js';
    util.goCreateWithArgs('angularcontrolleras', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /vm.title/);
  });

  describe('aspnet:angularcontrolleras in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'HomeController';
    var filename = 'HomeController.js';
    console.log(arg, dir);
    util.goCreateWithArgs('angularcontrolleras', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /vm.title/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:angulardirective without extension', function() {
    var arg = 'HomeComponentDirective';
    var filename = 'HomeComponentDirective.js';
    util.goCreateWithArgs('angulardirective', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /directive.\$inject/);
  });

  describe('aspnet:angulardirective with extension', function() {
    var filename = 'HomeComponentDirective.js';
    util.goCreateWithArgs('angulardirective', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /directive.\$inject/);
  });

  describe('aspnet:angulardirective in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'HomeComponentDirective';
    var filename = 'HomeComponentDirective.js';
    console.log(arg, dir);
    util.goCreateWithArgs('angulardirective', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /directive.\$inject/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:angularfactory without extension', function() {
    var arg = 'MyService';
    var filename = 'MyService.js';
    util.goCreateWithArgs('angularfactory', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /factory.\$inject/);
  });

  describe('aspnet:angularfactory with extension', function() {
    var filename = 'MyService.js';
    util.goCreateWithArgs('angularfactory', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /factory.\$inject/);
  });

  describe('aspnet:angularfactory in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'MyService';
    var filename = 'MyService.js';
    console.log(arg, dir);
    util.goCreateWithArgs('angularfactory', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /factory.\$inject/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\')');
  });

  describe('aspnet:angularmodule without extension', function() {
    var arg = 'MyApplication';
    var filename = 'MyApplication.js';
    util.goCreateWithArgs('angularmodule', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /angular.module/);
  });

  describe('aspnet:angularmodule with extension', function() {
    var filename = 'MyApplication.js';
    util.goCreateWithArgs('angularmodule', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /angular.module/);
  });

  describe('aspnet:angularmodule in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'MyApplication';
    var filename = 'MyApplication.js';
    console.log(arg, dir);
    util.goCreateWithArgs('angularmodule', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /angular.module/);
    util.fileContentCheck(filename, 'Check file content', '.module(\'emptyTest\'');
  });

  describe('aspnet:class without extension', function() {
    var arg = 'MyClass';
    var filename = 'MyClass.cs';
    util.goCreateWithArgs('class', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);
  });

  describe('aspnet:class with extension', function() {
    var filename = 'MyClass.cs';
    util.goCreateWithArgs('class', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);
  });

  describe('aspnet:class in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'MyClass';
    var filename = 'MyClass.cs';
    console.log(arg, dir);

    util.goCreateWithArgs('class', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);
    util.fileContentCheck(filename, 'Check file content', 'namespace emptyTest');
  });

  describe('aspnet:coffeescript without extension', function() {
    var arg = 'file';
    var filename = 'file.coffee';
    util.goCreateWithArgs('coffeescript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:coffeescript with extension', function() {
    var filename = 'file.coffee';
    util.goCreateWithArgs('coffeescript', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:htmlpage without extension', function() {
    var arg = 'mypage';
    var filename = 'mypage.html';
    util.goCreateWithArgs('htmlpage', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:htmlpage with extension', function() {
    var filename = 'mypage.html';
    util.goCreateWithArgs('htmlpage', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:interface without extension', function() {
    var arg = 'IContact';
    var filename = 'IContact.cs';
    util.goCreateWithArgs('interface', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*interface[ ]*IContact/);
  });

  describe('aspnet:interface with extension', function() {
    var filename = 'IContact.cs';
    util.goCreateWithArgs('interface', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*interface[ ]*IContact/);
  });

  describe('aspnet:interface in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'IContact';
    var filename = 'IContact.cs';
    console.log(arg, dir);
    util.goCreateWithArgs('interface', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*interface[ ]*IContact/);
    util.fileContentCheck(filename, 'Check file content', 'namespace emptyTest');
  });

  describe('aspnet:jsonschema without extension', function() {
    var arg = 'MySchema';
    var filename = 'MySchema.json';
    util.goCreateWithArgs('jsonschema', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /my MySchema JSON format/);
  });

  describe('aspnet:jsonschema with extension', function() {
    var filename = 'MySchema.json';
    util.goCreateWithArgs('jsonschema', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /my MySchema JSON format/);
  });

  describe('aspnet:middleware without extension', function() {
    var arg = 'MyMiddleware';
    var filename = 'MyMiddleware.cs';
    util.goCreateWithArgs('middleware', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyMiddleware/);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*static[ ]*class[ ]*MyMiddlewareExtensions/);
    util.fileContentCheck(filename, 'Check file content', /[ ]*IApplicationBuilder[ ]*UseMyMiddleware/);
  });

  describe('aspnet:middleware with extension', function() {
    var filename = 'MyMiddleware.cs';
    util.goCreateWithArgs('middleware', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyMiddleware/);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*static[ ]*class[ ]*MyMiddlewareExtensions/);
    util.fileContentCheck(filename, 'Check file content', /[ ]*IApplicationBuilder[ ]*UseMyMiddleware/);
  });

  describe('aspnet:middleware in cwd of project.json', function() {
    var dir = util.makeTempDir();

    util.goCreateApplication('classlibrary', 'emptyTest', dir);

    var arg = 'MyMiddleware';
    var filename = 'MyMiddleware.cs';
    console.log(arg, dir);

    util.goCreateWithArgs('middleware', [arg], path.join(dir, 'emptyTest'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyMiddleware/);
    util.fileContentCheck(filename, 'Check file content', 'namespace emptyTest');
  });

  describe('aspnet:javascript without extension', function() {
    var arg = 'file';
    var filename = 'file.js';
    util.goCreateWithArgs('javascript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:javascript with extension', function() {
    var filename = 'file.js';
    util.goCreateWithArgs('javascript', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:json without extension', function() {
    var arg = 'file';
    var filename = 'file.json';
    util.goCreateWithArgs('json', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:json with extension', function() {
    var filename = 'file.json';
    util.goCreateWithArgs('json', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:jsx without extension', function() {
    var arg = 'file';
    var filename = 'file.jsx';
    util.goCreateWithArgs('jsx', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:jsx with extension', function() {
    var arg = 'file';
    var filename = 'file.jsx';
    util.goCreateWithArgs('jsx', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:mvccontroller without extension', function() {
    var arg = 'file';
    var filename = 'file.cs';
    util.goCreateWithArgs('mvccontroller', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:mvccontroller with extension', function() {
    var filename = 'file.cs';
    util.goCreateWithArgs('mvccontroller', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:mvccontroller in cwd of project.json', function() {
    var arg = 'file';
    var filename = 'file.cs';
    var dir = util.makeTempDir();

    util.goCreateApplication('web', 'webTest', dir);
    util.goCreateWithArgs('mvccontroller', [arg], path.join(dir, 'webTest'));

    util.fileCheck('should create Controllers/' + filename + ' file', filename);
  });

  describe('aspnet:mvcview without extension', function() {
    var arg = 'file';
    var filename = 'file.cshtml';
    util.goCreateWithArgs('mvcview', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:mvcview with extension', function() {
    var filename = 'file.cshtml';
    util.goCreateWithArgs('mvcview', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:mvcview in cwd of project.json', function() {
    var arg = 'file';
    var filename = 'file.cshtml';
    var dir = util.makeTempDir();

    util.goCreateApplication('web', 'webTest', dir);
    util.goCreateWithArgs('mvcview', [arg], path.join(dir, 'webTest'));
    util.fileCheck('should create Views/' + filename + ' file', filename);
  });

  describe('aspnet:class without extension', function() {
    var arg = 'CartTagHelper';
    var filename = 'CartTagHelper.cs';
    util.goCreateWithArgs('taghelper', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*CartTagHelper/);
  });

  describe('aspnet:class with extension', function() {
    var filename = 'CartTagHelper.cs';
    util.goCreateWithArgs('taghelper', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*CartTagHelper/);
  });

  describe('aspnet:stylesheetscss without extension', function() {
    var arg = '_base';
    var filename = '_base.scss';
    util.goCreateWithArgs('stylesheetscss', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:stylesheetscss with extension', function() {
    var filename = '_base.scss';
    util.goCreateWithArgs('stylesheetscss', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:stylesheet without extension', function() {
    var arg = 'style';
    var filename = 'style.css';
    util.goCreateWithArgs('stylesheet', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:stylesheet with extension', function() {
    var filename = 'style.css';
    util.goCreateWithArgs('stylesheet', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:stylesheetless without extension', function() {
    var arg = '_base';
    var filename = '_base.less';
    util.goCreateWithArgs('stylesheetless', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:stylesheetless with extension', function() {
    var filename = '_base.less';
    util.goCreateWithArgs('stylesheetless', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:textfile without extension', function() {
    var arg = 'file';
    var filename = 'file.txt';
    util.goCreateWithArgs('textfile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:textfile with extension', function() {
    var filename = 'file.txt';
    util.goCreateWithArgs('textfile', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:typescript without extension', function() {
    var arg = 'file';
    var filename = 'file.ts';
    util.goCreateWithArgs('typescript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:typescript with extension', function() {
    var filename = 'file.ts';
    util.goCreateWithArgs('typescript', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:typescriptjsx without extension', function() {
    var arg = 'file';
    var filename = 'file.tsx';
    util.goCreateWithArgs('typescriptjsx', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:typescriptjsx with extension', function() {
    var filename = 'file.tsx';
    util.goCreateWithArgs('typescriptjsx', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:webapicontroller without extension', function() {
    var arg = 'file';
    var filename = 'file.cs';
    util.goCreateWithArgs('webapicontroller', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:webapicontroller with extension', function() {
    var filename = 'file.cs';
    util.goCreateWithArgs('webapicontroller', [filename]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  describe('aspnet:webapicontroller in cwd of project.json', function() {
    var arg = 'file';
    var filename = 'file.cs';
    var dir = util.makeTempDir();

    util.goCreateApplication('web', 'webTest', dir);
    util.goCreateWithArgs('webapicontroller', [arg], path.join(dir, 'webTest'));

    util.fileCheck('should create Controllers/' + filename + ' file', filename);
  });

  // now some tests to check if we correctly handle using named subgenerators
  // with commonly used scenario: having config.default.json or config.default
  // lets create config.default.json.txt and config.default.txt
  describe('aspnet:textfile creates config.default.json.txt from config.default.json', function() {
    var arg = 'config.default.json';
    var filename = 'config.default.json.txt';
    util.goCreateWithArgs('textfile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
  describe('aspnet:textfile creates config.default.txt from config.default', function() {
    var arg = 'config.default';
    var filename = 'config.default.txt';
    util.goCreateWithArgs('textfile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });

  // now some test for development/stating/production config.json
  describe('aspnet:textfile creates config.development.json from config.development', function() {
    var arg = 'config.development';
    var filename = 'config.development.json';
    util.goCreateWithArgs('json', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
  describe('aspnet:textfile creates config.staging.json from config.staging', function() {
    var arg = 'config.staging';
    var filename = 'config.staging.json';
    util.goCreateWithArgs('json', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
  describe('aspnet:textfile creates config.staging.json from config.staging.json', function() {
    var arg = 'config.staging.json';
    var filename = 'config.staging.json';
    util.goCreateWithArgs('json', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
  });
});
