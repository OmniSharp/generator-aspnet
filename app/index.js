'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var guid = require('uuid');
var projectName = require('vs_projectname');
var AspnetGenerator = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    // only implemented for web template
    this.option('grunt', {
      type: Boolean,
      defaults: false,
      desc: 'Use the Grunt JavaScript task runner instead of Gulp in web projects.'
    });
  },


  init: function() {
    this.log(yosay('Welcome to the marvellous ASP.NET 5 generator!'));
    this.templatedata = {};
  },

  askFor: function() {
    var done = this.async();

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
        },
        {
           name: 'Unit test project',
           value: 'unittest'
        }
      ]
    }];

    this.prompt(prompts, function(props) {
      this.type = props.type;

      done();
    }.bind(this));
  },

  askForName: function() {
    var done = this.async();
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
    this.prompt(prompts, function(props) {
      this.templatedata.namespace = projectName(props.applicationName);
      this.templatedata.applicationname = props.applicationName;
      this.applicationName = props.applicationName;
      this.templatedata.guid = guid.v4();
      this.templatedata.grunt = this.options.grunt || false;
      done();
    }.bind(this));
  },

  writing: function() {
    this.sourceRoot(path.join(__dirname, './templates/projects'));

    switch (this.type) {

      case 'empty':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.copy(this.sourceRoot() + '/hosting.ini', this.applicationName + '/hosting.ini');

        this.template(this.sourceRoot() + '/Startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

        /// wwwroot
        this.fs.copy(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
        break;

      case 'webapi':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copy(this.sourceRoot() + '/hosting.ini', this.applicationName + '/hosting.ini');
        this.fs.copyTpl(this.sourceRoot() + '/Startup.cs', this.applicationName + '/Startup.cs', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');
        this.fs.copy(this.sourceRoot() + '/Properties', this.applicationName + '/Properties');
        this.fs.copyTpl(this.sourceRoot() + '/Controllers/ValuesController.cs', this.applicationName + '/Controllers/ValuesController.cs', this.templatedata);
        this.fs.copy(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');
        break;

      case 'web':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        // Grunt or Gulp
        if (this.options.grunt) {
          this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.applicationName + '/Gruntfile.js', this.templatedata);
        } else {
          this.fs.copyTpl(this.templatePath('gulpfile.js'), this.applicationName + '/gulpfile.js', this.templatedata);
        }
        // individual files (configs, etc)
        this.fs.copy(this.templatePath('.bowerrc'), this.applicationName + '/.bowerrc');
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('bower.json'), this.applicationName + '/bower.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('config.json'), this.applicationName + '/config.json', this.templatedata);
        this.fs.copy(this.templatePath('hosting.ini'), this.applicationName + '/hosting.ini');
        this.fs.copyTpl(this.templatePath('package.json'), this.applicationName + '/package.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('project.json'), this.applicationName + '/project.json', this.templatedata);
        this.fs.copy(this.templatePath('README.md'), this.applicationName + '/README.md');
        this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationName + '/Startup.cs', this.templatedata);
        // Controllers
        this.fs.copyTpl(this.templatePath('Controllers/AccountController.cs'), this.applicationName + '/Controllers/AccountController.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationName + '/Controllers/HomeController.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Controllers/ManageController.cs'), this.applicationName + '/Controllers/ManageController.cs', this.templatedata);
        // Migrations
        this.fs.copyTpl(this.templatePath('Migrations/00000000000000_CreateIdentitySchema.Designer.cs'), this.applicationName + '/Migrations/00000000000000_CreateIdentitySchema.Designer.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Migrations/00000000000000_CreateIdentitySchema.cs'), this.applicationName + '/Migrations/00000000000000_CreateIdentitySchema.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Migrations/ApplicationDbContextModelSnapshot.cs'), this.applicationName + '/Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);
        // Models
        this.fs.copyTpl(this.templatePath('Models/AccountViewModels.cs'), this.applicationName + '/Models/AccountViewModels.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Models/IdentityModels.cs'), this.applicationName + '/Models/IdentityModels.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('Models/ManageViewModels.cs'), this.applicationName + '/Models/ManageViewModels.cs', this.templatedata);
        // Services
        this.fs.copyTpl(this.templatePath('Services/MessageServices.cs'), this.applicationName + '/Services/MessageServices.cs', this.templatedata);
        // Views
        this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationName + '/Views', this.templatedata);
        // wwwroot - the content in the wwwroot does not include any direct references or imports
        // So again it is copied 1-to-1 - but tests cover list of all files
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationName + '/wwwroot');
        break;
      case 'webbasic':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        // Grunt or Gulp
        if (this.options.grunt) {
          this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.applicationName + '/Gruntfile.js', this.templatedata);
        } else {
          this.fs.copyTpl(this.templatePath('gulpfile.js'), this.applicationName + '/gulpfile.js', this.templatedata);
        }
        // individual files (configs, etc)
        this.fs.copy(this.templatePath('.bowerrc'), this.applicationName + '/.bowerrc');
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('bower.json'), this.applicationName + '/bower.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('config.json'), this.applicationName + '/config.json', this.templatedata);
        this.fs.copy(this.templatePath('hosting.ini'), this.applicationName + '/hosting.ini');
        this.fs.copyTpl(this.templatePath('package.json'), this.applicationName + '/package.json', this.templatedata);
        this.fs.copyTpl(this.templatePath('project.json'), this.applicationName + '/project.json', this.templatedata);
        this.fs.copy(this.templatePath('README.md'), this.applicationName + '/README.md');
        this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationName + '/Startup.cs', this.templatedata);
        // Controllers
        this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationName + '/Controllers/HomeController.cs', this.templatedata);
        // Views
        this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationName + '/Views', this.templatedata);
        // wwwroot - the content in the wwwroot does not include any direct references or imports
        // So again it is copied 1-to-1 - but tests cover list of all files
        this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationName + '/wwwroot');
        break;
      case 'nancy':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/Startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

        this.template(this.sourceRoot() + '/homemodule.cs', this.applicationName + '/HomeModule.cs', this.templatedata);

        break;
      case 'console':
        this.sourceRoot(path.join(__dirname, '../templates/projects/console'));
        this.fs.copy(path.join(__dirname, '../templates/gitignore.txt'), this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.templatePath('Program.cs'), this.applicationName + '/Program.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('project.json'), this.applicationName + '/project.json', this.templatedata);

        break;
      case 'classlib':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/class.cs', this.applicationName + '/Class1.cs', this.templatedata);

        this.template(this.sourceRoot() + '/project.json', this.applicationName + '/project.json', this.templatedata);

        break;
      case 'unittest':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.fs.copyTpl(this.templatePath('**.*'), this.destinationPath(this.applicationName), this.templatedata);
        break;
      default:
        this.log('Unknown project type');
    }
  },

  end: function() {
    this.log('\r\n');
    this.log('Your project is now created, you can use the following commands to get going');
    this.log(chalk.green('    cd "' + this.applicationName + '"'));
    this.log(chalk.green('    dnu restore'));
    this.log(chalk.green('    dnu build') + ' (optional, build will also happen when it\'s run)');
    this.log(chalk.green('    dnx . run') + ' for console projects');
    this.log(chalk.green('    dnx . kestrel') + ' or ' + chalk.green('dnx . web') + ' for web projects');
    this.log('\r\n');

  }
});

module.exports = AspnetGenerator;
