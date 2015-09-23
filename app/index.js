'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var guid = require('uuid');
var projectName = require('vs_projectname');
var fs = require('fs');
var config = require('../config');
var AspnetGenerator = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    // only implemented for web template
    this.option('grunt', {
      type: Boolean,
      defaults: false,
      desc: 'Use the Grunt JavaScript task runner instead of Gulp in web projects.'
    });
    // for generating test projects.
    this.option('type', {
      type: String,
      defaults: '',
      desc: 'The type of template to create.'
    });
    this.option('applicationName', {
      type: String,
      defaults: '',
      desc: 'The name of the template to create.'
    });
    this.option('composing', {
      type: Boolean,
      defaults: false,
      desc: 'If we are composing this unit test template.'
    });

    // for letting editors give a specific directory
    this.option('useCurrentDirectory', {
      type: Boolean,
      defaults: false,
      desc: 'Use the current directory intead of creating a new one.'
    });
  },


  init: function() {
    this.log(yosay('Welcome to the marvellous ASP.NET 5 generator!'));
    this.templatedata = {};
  },

  askFor: function() {
    var done = this.async();

    if (this.options.type) {
      this.type = this.options.type;
      done();
      return;
    }

    var prompts = [{
      type: 'list',
      name: 'type',
      message: 'What type of application do you want to create?',
      choices: [{
        name: 'Empty Application',
        value: 'empty'
      }, {
        name: 'Console Application',
        value: 'console'
      }, {
        name: 'Web Application',
        value: 'web'
      }, {
        name: 'Web Application Basic [without Membership and Authorization]',
        value: 'webbasic'
      }, {
        name: 'Web API Application',
        value: 'webapi'
      }, {
        name: 'Nancy ASP.NET Application',
        value: 'nancy'
      }, {
        name: 'Class Library',
        value: 'classlib'
      }, {
        name: 'Unit test project',
        value: 'unittest'
      }]
    }];

    this.prompt(prompts, function(props) {
      this.type = props.type;

      done();
    }.bind(this));
  },

  askForName: function() {
    var done = this.async();

    var cb = function cb(props) {
      this.templatedata.namespace = projectName(props.applicationName);
      this.templatedata.applicationname = props.applicationName;
      this.applicationName = props.applicationName;
      this.templatedata.guid = guid.v4();
      this.templatedata.grunt = this.options.grunt || false;
      done();
    }.bind(this);

    if (this.options.applicationName) {
      cb({
        applicationName: this.options.applicationName
      });
      return;
    }

    var app = '';
    switch (this.type) {
      case 'empty':
        app = 'EmptyApplication';
        break;
      case 'console':
        app = 'ConsoleApplication';
        break;
      case 'web':
        app = 'WebApplication';
        break;
      case 'webbasic':
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
      case 'unittest':
        app = 'UnitTest';
        break;
    }
    var prompts = [{
      name: 'applicationName',
      message: 'What\'s the name of your ASP.NET application?',
      default: app
    }];
    this.prompt(prompts, cb);
  },

  askForProjectStructure: function() {
    var done = this.async();

    var setApplicationDirectory = function() {
      if (this.type === 'unittest') {
        this.applicationDirectory = 'tests/' + this.applicationName;
      } else {
        this.applicationDirectory = 'src/' + this.applicationName;
      }
    }.bind(this);

    if (this.options.composing) {
      this.projectStructure = true;
      setApplicationDirectory();
      done();
      return;
    }

    if (config.getGlobalJsonPath()) {
      var globalJsonDirectory = path.resolve(path.dirname(config.getGlobalJsonPath()));
      if (fs.existsSync(path.join(globalJsonDirectory, 'tests')) || fs.existsSync(path.join(globalJsonDirectory, 'src'))) {
        setApplicationDirectory();
        if (this.destinationRoot() !== globalJsonDirectory) {
          this.destinationRoot(globalJsonDirectory);
        }
      } else {
        this.applicationDirectory = this.applicationName;
      }

      done();
      return;
    }

    var prompts = [{
      type: 'confirm',
      name: 'projectStructure',
      message: 'Would you like to use the standard solution structure for your solution?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      this.projectStructure = props.projectStructure;
      if (props.projectStructure) {
        setApplicationDirectory();
      } else {
        this.applicationDirectory = this.applicationName;
      }
      done();
    }.bind(this));
  },

  askForSolutionFolder: function() {
    var done = this.async();

    if (!this.projectStructure || this.options.composing) {
      done();
      return;
    }

    if (this.options.useCurrentDirectory) {
      this.solutionName = path.basename(this.destinationRoot());
      done();
      return;
    }

    var prompts = [{
      type: 'input',
      name: 'solutionName',
      message: 'What folder name would like to use for your solution?',
      default: this.applicationName
    }];

    this.prompt(prompts, function(props) {
      this.destinationRoot(this.destinationRoot() + '/' + props.solutionName);
      this.solutionName = props.solutionName;
      done();
    }.bind(this));
  },

  askForTestProject: function() {
    var done = this.async();

    if (!this.projectStructure || this.options.composing || this.type === 'unittest') {
      done();
      return;
    }

    var prompts = [{
      type: 'confirm',
      name: 'testProject',
      message: 'Would you like to create a Unit Test Project?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      if (props.testProject) {
        this.composeWith('aspnet:app', {
          options: {
            type: 'unittest',
            applicationName: this.applicationName + '.Tests',
            composing: true
          }
        });
      }
      done();
    }.bind(this));

  },

  writing: function() {
    this.sourceRoot(path.join(__dirname, '../templates/projects'));

    if (this.projectStructure && !this.fs.exists('.gitignore')) {
      this.copy(this.sourceRoot() + '/../global.json', 'global.json');
    }

    if (this.projectStructure && !this.fs.exists('.gitignore')) {
      this.fs.copy(this.sourceRoot() + '/../gitignore.txt', '.gitignore');
    }
    
    if (!this.projectStructure && !this.fs.exists(this.applicationDirectory + '/.gitignore')) {
      this.fs.copy(this.sourceRoot() + '/../gitignore.txt', this.applicationDirectory + '/.gitignore');
    }

    switch (this.type) {

      case 'empty':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/hosting.ini', this.applicationDirectory + '/hosting.ini');

        this.template(this.sourceRoot() + '/Startup.cs', this.applicationDirectory + '/Startup.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationDirectory + '/project.json');

        this.copy(this.sourceRoot() + '/../../Dockerfile.txt', this.applicationDirectory + '/Dockerfile');

        /// wwwroot
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationDirectory + '/wwwroot');
        break;

      case 'webapi':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.copy(this.sourceRoot() + '/../../Dockerfile.txt', this.applicationDirectory + '/Dockerfile');
        this.fs.copyTpl(this.sourceRoot() + '/Startup.cs', this.applicationDirectory + '/Startup.cs', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/project.json', this.applicationDirectory + '/project.json');
        this.fs.copy(this.sourceRoot() + '/Properties', this.applicationDirectory + '/Properties');
        this.fs.copyTpl(this.sourceRoot() + '/Controllers/ValuesController.cs', this.applicationDirectory + '/Controllers/ValuesController.cs', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/wwwroot', this.applicationDirectory + '/wwwroot');
        break;

      case 'web':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        // Grunt or Gulp
        if (this.options.grunt) {
          this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.applicationDirectory + '/Gruntfile.js', this.templatedata);
        } else {
          this.fs.copyTpl(this.templatePath('gulpfile.js'), this.applicationDirectory + '/gulpfile.js', this.templatedata);
        }
        // individual files (configs, etc)
        this.copy(this.sourceRoot() + '/../../Dockerfile.txt', this.applicationDirectory + '/Dockerfile');
        this.fs.copy(this.templatePath('.bowerrc'), this.applicationDirectory + '/.bowerrc');
        this.fs.copyTpl(this.templatePath('appsettings.json'), this.applicationDirectory + '/appsettings.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('bower.json'), this.applicationDirectory + '/bower.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('package.json'), this.applicationDirectory + '/package.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('project.json'), this.applicationDirectory + '/project.json', this.templatedata);
        this.fs.copy(this.templatePath('README.md'), this.applicationDirectory + '/README.md');
        this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationDirectory + '/Startup.cs', this.templatedata);
        // Controllers
        this.fs.copyTpl(this.templatePath('Controllers/AccountController.cs'), this.applicationDirectory + '/Controllers/AccountController.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationDirectory + '/Controllers/HomeController.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Controllers/ManageController.cs'), this.applicationDirectory + '/Controllers/ManageController.cs', this.templatedata);
        // Migrations
        this.fs.copyTpl(this.templatePath('Migrations/00000000000000_Initial.Designer.cs'), this.applicationDirectory + '/Migrations/00000000000000_Initial.Designer.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Migrations/00000000000000_Initial.cs'), this.applicationDirectory + '/Migrations/00000000000000_Initial.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Migrations/ApplicationDbContextModelSnapshot.cs'), this.applicationDirectory + '/Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);
        // Models
        this.fs.copyTpl(this.templatePath('Models/ApplicationDbContext.cs'), this.applicationDirectory + '/Models/ApplicationDbContext.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Models/ApplicationUser.cs'), this.applicationDirectory + '/Models/ApplicationUser.cs', this.templatedata);
        // Services
        this.fs.copyTpl(this.templatePath('Services/IEmailSender.cs'), this.applicationDirectory + '/Services/IEmailSender.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Services/ISmsSender.cs'), this.applicationDirectory + '/Services/ISmsSender.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Services/MessageServices.cs'), this.applicationDirectory + '/Services/MessageServices.cs', this.templatedata);
        // ViewModels
        this.fs.copyTpl(this.templatePath('ViewModels/**/*'), this.applicationDirectory + '/ViewModels', this.templatedata);
        // Views
        this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationDirectory + '/Views', this.templatedata);
        // wwwroot - the content in the wwwroot does not include any direct references or imports
        // So again it is copied 1-to-1 - but tests cover list of all files
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationDirectory + '/wwwroot');
        break;
      case 'webbasic':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        // Grunt or Gulp
        if (this.options.grunt) {
          this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.applicationDirectory + '/Gruntfile.js', this.templatedata);
        } else {
          this.fs.copyTpl(this.templatePath('gulpfile.js'), this.applicationDirectory + '/gulpfile.js', this.templatedata);
        }
        // individual files (configs, etc)
        this.copy(this.sourceRoot() + '/../../Dockerfile.txt', this.applicationDirectory + '/Dockerfile');
        this.fs.copy(this.templatePath('.bowerrc'), this.applicationDirectory + '/.bowerrc');
        this.fs.copyTpl(this.templatePath('appsettings.json'), this.applicationDirectory + '/appsettings.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('bower.json'), this.applicationDirectory + '/bower.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('package.json'), this.applicationDirectory + '/package.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('project.json'), this.applicationDirectory + '/project.json', this.templatedata);
        this.fs.copy(this.templatePath('README.md'), this.applicationDirectory + '/README.md');
        this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationDirectory + '/Startup.cs', this.templatedata);
        // Controllers
        this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationDirectory + '/Controllers/HomeController.cs', this.templatedata);
        // Views
        this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationDirectory + '/Views', this.templatedata);
        // wwwroot - the content in the wwwroot does not include any direct references or imports
        // So again it is copied 1-to-1 - but tests cover list of all files
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationDirectory + '/wwwroot');
        break;
      case 'nancy':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.template(this.sourceRoot() + '/Startup.cs', this.applicationDirectory + '/Startup.cs', this.templatedata);

        this.fs.copyTpl(this.sourceRoot() + '/project.json', this.applicationDirectory + '/project.json', this.templatedata);

        this.template(this.sourceRoot() + '/homemodule.cs', this.applicationDirectory + '/HomeModule.cs', this.templatedata);

        break;
      case 'console':
        this.sourceRoot(path.join(__dirname, '../templates/projects/console'));
        this.fs.copyTpl(this.templatePath('Program.cs'), this.applicationDirectory + '/Program.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('project.json'), this.applicationDirectory + '/project.json', this.templatedata);

        break;
      case 'classlib':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.template(this.sourceRoot() + '/class.cs', this.applicationDirectory + '/Class1.cs', this.templatedata);

        this.fs.copyTpl(this.sourceRoot() + '/project.json', this.applicationDirectory + '/project.json', this.templatedata);

        break;
      case 'unittest':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.fs.copyTpl(this.templatePath('**.*'), this.destinationPath(this.applicationDirectory), this.templatedata);
        break;
      default:
        this.log('Unknown project type');
    }
  },

  end: function() {
    if (this.options.composing) {
      return;
    }
    if (this.projectStructure) {
      this.log('\r\n');
      this.log('Your project is now created, you can use the following commands to get going');
      this.log(chalk.green('    cd "' + this.solutionName + '/' + this.applicationDirectory + '"'));
      this.log(chalk.green('    dnu restore'));
      this.log(chalk.green('    dnu build') + ' (optional, build will also happen when it\'s run)');
      this.log('\r\n');
    } else {
      this.log('\r\n');
      this.log('Your project is now created, you can use the following commands to get going');
      this.log(chalk.green('    cd "' + this.applicationName + '"'));
      this.log(chalk.green('    dnu restore'));
      this.log(chalk.green('    dnu build') + ' (optional, build will also happen when it\'s run)');
      this.log('\r\n');
    }

    switch (this.type) {
      case 'console':
        this.log(chalk.green('    dnx ' + this.templatedata.namespace));
        break;
      case 'empty':
      case 'nancy':
      case 'web':
      case 'webapi':
      case 'webbasic':
        this.log(chalk.green('    dnx web'));
        break;
      case 'unittest':
        this.log(chalk.green('    dnx test'));
        break;
    }

    this.log('\r\n');
  }
});

module.exports = AspnetGenerator;
