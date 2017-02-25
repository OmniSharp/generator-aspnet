'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var path = require('path');
var guid = require('uuid');
var projectName = require('vs_projectname');
var pckg = require('../package.json');
var AspnetGenerator = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('type', { type: String, required: false, desc: 'the project type to create' });
    this.argument('applicationName', { type: String, required: false, desc: 'the name of the application' });
    this.argument('ui', {type: String, required: false, defaults: 'bootstrap', desc: 'the ui library to use (bootstrap OR semantic)'});
  },


  init: function() {
    this.log(yosay('Welcome to the marvellous ASP.NET Core generator!'));
    this.templatedata = {};
  },

  _checkProjectType: function() {
    if (this.type) {
      //normalize to lower case
      this.type = this.type.toLowerCase();
      var validProjectTypes = [
        'web',
        'console',
        'mvc',
        'mvcbasic',
        'webapi',
        'nancy',
        'classlib',
        'xunit',
        'mstest',
        'fsharp_classlib',
        'fsharp_webapi',
        'fsharp_console',
        'fsharp_web',
        'fsharp_mvcbasic',
        'fsharp_mstest',
        'fsharp_xunit'];

      if (validProjectTypes.indexOf(this.type) === -1) {
        //if it's not in the list, send them through the normal path
        this.log('"%s" is not a valid project type', chalk.cyan(this.type));
        this.type = undefined;
        this.applicationName = undefined;
      } else {
        this.log('Creating "%s" project', chalk.cyan(this.type));
      }
    }
  },

  askFor: function() {
    this._checkProjectType();
    if (!this.type) {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'type',
        message: 'What type of application do you want to create?',
        choices: [
          {
            name: 'Empty Web Application',
            value: 'web'
          }, {
            name: 'Empty Web Application (F#)',
            value: 'fsharp_web'
          }, {
            name: 'Console Application',
            value: 'console'
          }, {
            name: 'Console Application (F#)',
            value: 'fsharp_console'
          }, {
            name: 'Web Application',
            value: 'mvc'
          }, {
            name: 'Web Application Basic [without Membership and Authorization]',
            value: 'mvcbasic'
          }, {
            name: 'Web Application Basic [without Membership and Authorization] (F#)',
            value: 'fsharp_mvcbasic'
          }, {
            name: 'Web API Application',
            value: 'webapi'
          }, {
            name: 'Web API Application (F#)',
            value: 'fsharp_webapi'
          }, {
            name: 'Nancy ASP.NET Application',
            value: 'nancy'
          }, {
            name: 'Class Library',
            value: 'classlib'
          }, {
            name: 'Class Library (F#)',
            value: 'fsharp_classlib'
          }, {
            name: 'Unit Test project (MSTest)',
            value: 'mstest'
          }, {
            name: 'Unit Test project (xUnit.net)',
            value: 'xunit'
          }, {
            name: 'Unit Test project (MSTest) (F#)',
            value: 'fsharp_mstest'
          }, {
            name: 'Unit Test Project (xUnit.net) (F#)',
            value: 'fsharp_xunit'
          }
        ]
      },
      {
          type: 'list',
          name: 'ui',
          message: 'Which UI framework would you like to use?',
          default: 'bootstrap',
          choices: [
            {
              name: 'Bootstrap (3.3.7)',
              value: 'bootstrap'
            },
            {
              name: 'Semantic UI (2.2.2)',
              value: 'semantic'
            }
          ],
          when: function (answers){
            return answers.type === 'mvc' || answers.type === 'mvcbasic';
          }

      }
      ];

      this.prompt(prompts, function (props) {
        this.type = props.type;
        this.ui = props.ui;
        done();
      }.bind(this));
    }
  },

  _buildTemplateData: function() {
    this.templatedata.namespace = projectName(this.applicationName);
    this.templatedata.applicationname = this.applicationName;
    this.templatedata.includeApplicationInsights = false;
    this.templatedata.guid = guid.v4();
    this.templatedata.sqlite = (this.type === 'mvc') ? true : false;
    this.templatedata.ui = this.ui;
    this.templatedata.version = "1.0.0-rc4-004771";
    this.templatedata.dotnet = {
      version: this.options['versionCurrent'] ?
        pckg.dotnet.current.version : pckg.dotnet.lts.version,
      targetFramework: this.options['versionCurrent'] ?
        pckg.dotnet.current.targetFramework : pckg.dotnet.lts.targetFramework
    };
  },

  askForName: function() {
    if (!this.applicationName) {
      var done = this.async();
      var app = '';
      switch (this.type) {
        case 'web':
          app = 'EmptyWebApplication';
          break;
        case 'console':
          app = 'ConsoleApplication';
          break;
        case 'mvc':
          app = 'WebApplication';
          break;
        case 'mvcbasic':
          app = 'WebApplicationBasic';
          break;
        case 'webapi':
          app = 'WebAPIApplication';
          break;
        case 'nancy':
          app = 'NancyApplication';
          break;
        case 'classlib':
          app = 'ClassLibrary';
          break;
        case 'mstest':
          app = 'UnitTest';
          break;
        case 'xunit':
          app = 'UnitTest';
          break;
        case 'fsharp_classlib':
          app = "ClassLibrary";
          break;
        case 'fsharp_console':
          app = "ConsoleApplication";
          break;
        case 'fsharp_webapi':
          app = "WebAPIApplication";
          break;
        case 'fsharp_web':
          app = "EmptyWebApplication";
          break;
        case 'fsharp_mvcbasic':
          app = "WebApplicationBasic";
          break;
        case 'fsharp_mstest':
          app = "UnitTest";
          break;
        case 'fsharp_xunit':
          app = "UnitTest";
          break;
      }
      var prompts = [{
        name: 'applicationName',
        message: 'What\'s the name of your ASP.NET application?',
        default: app
      }];
      this.prompt(prompts, function (props) {
        this.applicationName = props.applicationName;
        this._buildTemplateData();
        done();
      }.bind(this));
    } else {
      this._buildTemplateData();
    }
  },

  writing: function() {
    this.sourceRoot(path.join(__dirname, './templates/projects'));

    switch (this.type) {

      case 'web':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/Program.cs', this.applicationName + '/Program.cs', this.templatedata);

        this.template(this.sourceRoot() + '/Startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

        this.template(this.sourceRoot() + '/Company.WebApplication1.csproj', this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);

        this.copy(this.sourceRoot() + '/web.config', this.applicationName + '/web.config');

        /// Properties
        this.fs.copyTpl(this.templatePath('Properties/**/*'), this.applicationName + '/Properties', this.templatedata);
        this.copy(this.sourceRoot() + '/runtimeconfig.template.json', this.applicationName + '/runtimeconfig.template.json');
        this.fs.copy(this.sourceRoot() + '/README.md', this.applicationName + '/README.md');
        mkdirp.sync(this.applicationName + '/wwwroot');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'webapi':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.copy(this.sourceRoot() + '/appsettings.json', this.applicationName + '/appsettings.json');
        this.copy(this.sourceRoot() + '/appsettings.Development.json', this.applicationName + '/appsettings.Development.json');
        this.fs.copyTpl(this.sourceRoot() + '/Startup.cs', this.applicationName + '/Startup.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/Program.cs', this.applicationName + '/Program.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/Company.WebApplication1.csproj', this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('Properties/**/*'), this.applicationName + '/Properties', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/Controllers/ValuesController.cs', this.applicationName + '/Controllers/ValuesController.cs', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/web.config', this.applicationName + '/web.config');
        this.fs.copy(this.sourceRoot() + '/README.md', this.applicationName + '/README.md');
        mkdirp.sync(this.applicationName + '/wwwroot');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'mvc':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        // individual files (configs, etc)
        this.fs.copy(this.templatePath('.bowerrc'), this.applicationName + '/.bowerrc');
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('appsettings.json'), this.applicationName + '/appsettings.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('appsettings.Development.json'), this.applicationName + '/appsettings.Development.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('bower.json'), this.applicationName + '/bower.json', this.templatedata);
        this.fs.copy(this.templatePath('bundleconfig.json'), this.applicationName + '/bundleconfig.json');
        this.fs.copy(this.templatePath('Company.WebApplication1.db'), this.applicationName + '/' + this.applicationName + '.db');
        this.fs.copyTpl(this.templatePath('Company.WebApplication1.csproj'), this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('Program.cs'), this.applicationName + '/Program.cs', this.templatedata);
        this.fs.copy(this.templatePath('README.md'), this.applicationName + '/README.md');
        this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationName + '/Startup.cs', this.templatedata);
        // Controllers
        this.fs.copyTpl(this.templatePath('Controllers/AccountController.cs'), this.applicationName + '/Controllers/AccountController.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationName + '/Controllers/HomeController.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Controllers/ManageController.cs'), this.applicationName + '/Controllers/ManageController.cs', this.templatedata);
        // Migrations
        this.fs.copyTpl(this.templatePath('Data/Migrations/00000000000000_CreateIdentitySchema.Designer.cs'), this.applicationName + '/Data/Migrations/00000000000000_CreateIdentitySchema.Designer.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Data/Migrations/00000000000000_CreateIdentitySchema.cs'), this.applicationName + '/Data/Migrations/00000000000000_CreateIdentitySchema.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Data/Migrations/ApplicationDbContextModelSnapshot.cs'), this.applicationName + '/Data/Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Data/ApplicationDbContext.cs'), this.applicationName + '/Data/ApplicationDbContext.cs', this.templatedata);
        // Models
        this.fs.copyTpl(this.templatePath('Models/ApplicationUser.cs'), this.applicationName + '/Models/ApplicationUser.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Models/AccountViewModels/**/*'), this.applicationName + '/Models/AccountViewModels', this.templatedata);
        this.fs.copyTpl(this.templatePath('Models/ManageViewModels/**/*'), this.applicationName + '/Models/ManageViewModels', this.templatedata);
        // Properties
        this.fs.copyTpl(this.templatePath('Properties/**/*'), this.applicationName + '/Properties', this.templatedata);
        // Services
        this.fs.copyTpl(this.templatePath('Services/IEmailSender.cs'), this.applicationName + '/Services/IEmailSender.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Services/ISmsSender.cs'), this.applicationName + '/Services/ISmsSender.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Services/MessageServices.cs'), this.applicationName + '/Services/MessageServices.cs', this.templatedata);
        // Views
        this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationName + '/Views', this.templatedata);
        // wwwroot
        // wwwroot - the content in the wwwroot does not include any direct references or imports
        // So again it is copied 1-to-1 - but tests cover list of all files
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationName + '/wwwroot');
        this.fs.copy(this.templatePath('web.config'), this.applicationName + '/web.config');
        // UI Component Overrides
        // If the developer has placed anything in overrides/ui-module/project-type/**/* then use it
        this.fs.copyTpl(this.templatePath('/../../overrides/' + this.ui + '/' + this.type + '/**/*'), this.applicationName + '/', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;
      case 'mvcbasic':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        // individual files (configs, etc)
        this.fs.copy(this.templatePath('.bowerrc'), this.applicationName + '/.bowerrc');
        this.fs.copy(this.templatePath('bundleconfig.json'), this.applicationName + '/bundleconfig.json');
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('bower.json'), this.applicationName + '/bower.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('appsettings.json'), this.applicationName + '/appsettings.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('appsettings.Development.json'), this.applicationName + '/appsettings.Development.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('Company.WebApplication1.csproj'), this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('Program.cs'), this.applicationName + '/Program.cs', this.templatedata);
        // Properties
        this.fs.copyTpl(this.templatePath('Properties/**/*'), this.applicationName + '/Properties', this.templatedata);
        this.fs.copy(this.templatePath('README.md'), this.applicationName + '/README.md');
        this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationName + '/Startup.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('web.config'), this.applicationName + '/web.config', this.templatedata);
        // Controllers
        this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationName + '/Controllers/HomeController.cs', this.templatedata);
        // Views
        this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationName + '/Views', this.templatedata);

        // wwwroot - the content in the wwwroot does not include any direct references or imports
        // So again it is copied 1-to-1 - but tests cover list of all files
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationName + '/wwwroot');

        // UI Component Overrides
        // If the developer has placed anything in overrides/ui-module/project-type/**/* then use it
        this.fs.copyTpl(this.templatePath('/../../overrides/' + this.ui + '/' + this.type + '/**/*'), this.applicationName + '/', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;
      case 'nancy':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.template(this.sourceRoot() + '/Startup.cs', this.applicationName + '/Startup.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('NancyTemplate.csproj'), this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.template(this.sourceRoot() + '/HomeModule.cs', this.applicationName + '/HomeModule.cs', this.templatedata);
        this.template(this.sourceRoot() + '/Program.cs', this.applicationName + '/Program.cs', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;
      case 'console':
        this.sourceRoot(path.join(__dirname, '../templates/projects/console'));
        this.fs.copy(path.join(__dirname, '../templates/gitignore.txt'), this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('Program.cs'), this.applicationName + '/Program.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Company.ConsoleApplication1.csproj'), this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;
      case 'classlib':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/Class1.cs', this.applicationName + '/Class1.cs', this.templatedata);

        this.fs.copyTpl(this.sourceRoot() + '/Company.ClassLibrary1.csproj', this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;
      case 'xunit':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.template(this.sourceRoot() + '/UnitTest1.cs', this.applicationName + '/UnitTest1.cs', this.templatedata);
        this.template(this.sourceRoot() + '/Company.TestProject1.csproj', this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.copy(this.sourceRoot() + '/xunit.runner.json', this.applicationName + '/xunit.runner.json');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'mstest':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.template(this.sourceRoot() + '/UnitTest1.cs', this.applicationName + '/UnitTest1.cs', this.templatedata);
        this.template(this.sourceRoot() + '/Company.TestProject1.csproj', this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      //F# Cases
      case 'fsharp_classlib':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.template(this.sourceRoot() + '/Library.fs', this.applicationName + '/Library.fs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/Company.ClassLibrary1.fsproj', this.applicationName + '/' + this.applicationName + '.fsproj', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'fsharp_console':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.fs.copy(path.join(__dirname, '../templates/gitignore.txt'), this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('Program.fs'), this.applicationName + '/Program.fs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Company.ConsoleApplication1.fsproj'), this.applicationName + '/' + this.applicationName + '.fsproj', this.templatedata);
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'fsharp_web':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.template(this.sourceRoot() + '/Program.fs', this.applicationName + '/Program.fs', this.templatedata);
        this.template(this.sourceRoot() + '/Startup.fs', this.applicationName + '/Startup.fs', this.templatedata);
        this.template(this.sourceRoot() + '/Company.WebApplication1.fsproj', this.applicationName + '/' + this.applicationName + '.fsproj', this.templatedata);
        this.copy(this.sourceRoot() + '/web.config', this.applicationName + '/web.config');
        /// Properties
        this.fs.copyTpl(this.templatePath('Properties/**/*'), this.applicationName + '/Properties', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/README.md', this.applicationName + '/README.md');
        this.fs.copyTpl(this.templatePath('/runtimeconfig.template.json'), this.applicationName + '/runtimeconfig.template.json', this.templatedata);
        mkdirp.sync(this.applicationName + '/wwwroot');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'fsharp_webapi':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.copy(this.sourceRoot() + '/appsettings.json', this.applicationName + '/appsettings.json');
        this.copy(this.sourceRoot() + '/appsettings.Development.json', this.applicationName + '/appsettings.Development.json');
        this.fs.copyTpl(this.sourceRoot() + '/Startup.fs', this.applicationName + '/Startup.fs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/Program.fs', this.applicationName + '/Program.fs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/Company.WebApplication1.fsproj', this.applicationName + '/' + this.applicationName + '.fsproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('Properties/**/*'), this.applicationName + '/Properties', this.templatedata);
        this.fs.copyTpl(this.templatePath() + '/Controllers/**/*', this.applicationName + '/Controllers', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/web.config', this.applicationName + '/web.config');
        this.fs.copy(this.sourceRoot() + '/README.md', this.applicationName + '/README.md');
        this.fs.copy(this.sourceRoot() + '/runtimeconfig.template.json', this.applicationName + '/runtimeconfig.template.json');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'fsharp_mvcbasic':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        // individual files (configs, etc)
        this.fs.copy(this.templatePath('.bowerrc'), this.applicationName + '/.bowerrc');
        this.fs.copy(this.templatePath('bundleconfig.json'), this.applicationName + '/bundleconfig.json');
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('bower.json'), this.applicationName + '/bower.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('appsettings.json'), this.applicationName + '/appsettings.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('appsettings.Development.json'), this.applicationName + '/appsettings.Development.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('Company.WebApplication1.fsproj'), this.applicationName + '/' + this.applicationName + '.fsproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('Program.fs'), this.applicationName + '/Program.fs', this.templatedata);
        // Properties
        this.fs.copyTpl(this.templatePath('Properties/**/*'), this.applicationName + '/Properties', this.templatedata);
        this.fs.copy(this.templatePath('README.md'), this.applicationName + '/README.md');
        this.fs.copyTpl(this.templatePath('Startup.fs'), this.applicationName + '/Startup.fs', this.templatedata);
        this.fs.copyTpl(this.templatePath('web.config'), this.applicationName + '/web.config', this.templatedata);
        // Controllers
        this.fs.copyTpl(this.templatePath('Controllers/**/*'), this.applicationName + '/Controllers', this.templatedata);
        // Views
        this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationName + '/Views', this.templatedata);

        // wwwroot - the content in the wwwroot does not include any direct references or imports
        // So again it is copied 1-to-1 - but tests cover list of all files
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationName + '/wwwroot');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'fsharp_xunit':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('Company.TestProject1.fsproj'), this.applicationName + '/' + this.applicationName + '.fsproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('Tests.fs'), this.applicationName + '/Tests.fs', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/xunit.runner.json', this.applicationName + '/xunit.runner.json');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      case 'fsharp_mstest':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('Company.TestProject1.fsproj'), this.applicationName + '/' + this.applicationName + '.fsproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('Tests.fs'), this.applicationName + '/Tests.fs', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/xunit.runner.json', this.applicationName + '/xunit.runner.json');
        this.template(this.sourceRoot() + '/../../global.json', this.applicationName + '/global.json', this.templatedata);
        break;

      default:
        this.log('Unknown project type');
    }
  },

  /**
   * Called on the very end of Yo execution
   * Dependencies are installed only for web type
   * of projects that depends on client side libraries
   * and tools like Gulp or Grunt
   * Uses can skip installing dependencies using built-in yo
   * --skip-install option
   */
  end: function() {
    if(!this.options['skip-install'] && (this.type === 'mvc' || this.type === 'mvcbasic' || this.type === "fsharp_mvcbasic")) {
      process.chdir(this.applicationName);
      this.installDependencies({
        npm: false,
        bower: true,
        callback: this._showUsageHints.bind(this)
      });
    } else {
      this._showUsageHints();
    }
  },

  /**
   * Shows usage hints to end user
   * Called on the very end of all processes
   */
  _showUsageHints: function() {
    this.log('\r\n');
    this.log('Your project is now created, you can use the following commands to get going');
    this.log(chalk.green('    cd "' + this.applicationName + '"'));
    this.log(chalk.green('    dotnet restore'));
    this.log(chalk.green('    dotnet build') + ' (optional, build will also happen when it\'s run)');
    if(this.type === 'mvc') {
      this.log(chalk.green('    dotnet ef database update') + ' (to create the SQLite database for the project)');
    }
    switch (this.type) {
      case 'console':
        this.log(chalk.green('    dotnet run'));
        break;
      case 'web':
      case 'nancy':
      case 'mvc':
      case 'webapi':
      case 'mvcbasic':
      case 'fsharp_console':
      case 'fsharp_webapi':
      case 'fsharp_mvcbasic':
      case 'fsharp_web':
        this.log(chalk.green('    dotnet run'));
        break;
      case 'xunit':
      case 'fsharp_mstest':
      case 'fsharp_xunit':
        this.log(chalk.green('    dotnet test'));
        break;
    }

    this.log('\r\n');
  }
});

module.exports = AspnetGenerator;
