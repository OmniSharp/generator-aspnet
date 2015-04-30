'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var guid = require('uuid');
var AspnetGenerator = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    // only implemented for web template
    this.option('gulp');
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
          name: 'Web API Application',
          value: 'webapi'
        }, {
          name: 'Nancy ASP.NET Application',
          value: 'nancy'
        }, {
          name: 'Class Library',
          value: 'classlib'
        },
        //                {
        //                    name: 'Unit test project',
        //                    value: 'unittest'
        //                }
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
      this.templatedata.namespace = props.applicationName;
      this.templatedata.applicationname = props.applicationName;
      this.applicationName = props.applicationName;
      this.templatedata.guid = guid.v4();

      done();
    }.bind(this));
  },

  writing: function() {
    this.sourceRoot(path.join(__dirname, './templates/projects'));

    switch (this.type) {

      case 'empty':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

        /// wwwroot
        this.fs.copy(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
        break;

      case 'webapi':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

        this.template(this.sourceRoot() + '/controllers_values.cs', this.applicationName + '/Controllers/ValuesController.cs', this.templatedata);

        /// wwwroot
        this.fs.copy(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
        break;

      case 'web':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
        this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
        this.fs.copyTpl(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/bower.json', this.applicationName + '/bower.json', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/config.json', this.applicationName + '/config.json', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/messageservice.cs', this.applicationName + '/MessageService.cs', this.templatedata);
        if (this.options.gulp) {
          this.fs.copyTpl(this.sourceRoot() + '/_gulp_project.json', this.applicationName + '/project.json', this.templatedata);
          this.fs.copyTpl(this.sourceRoot() + '/_gulp_package.json', this.applicationName + '/package.json', this.templatedata);
          this.fs.copy(this.sourceRoot() + '/_gulpfile.js', this.applicationName + '/gulpfile.js');
        } else {
          this.fs.copyTpl(this.sourceRoot() + '/_grunt_project.json', this.applicationName + '/project.json', this.templatedata);
          this.fs.copyTpl(this.sourceRoot() + '/_grunt_package.json', this.applicationName + '/package.json', this.templatedata);
          this.fs.copy(this.sourceRoot() + '/_gruntfile.js', this.applicationName + '/gruntfile.js');
        }
        // models
        this.fs.copyTpl(this.sourceRoot() + '/models_accountview.cs', this.applicationName + '/Models/AccountViewModels.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/models_identity.cs', this.applicationName + '/Models/IdentityModels.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/models_manageview.cs', this.applicationName + '/Models/ManageViewModels.cs', this.templatedata);
        // controllers
        this.fs.copyTpl(this.sourceRoot() + '/controllers_account.cs', this.applicationName + '/Controllers/AccountController.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/controllers_home.cs', this.applicationName + '/Controllers/HomeController.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/controllers_manage.cs', this.applicationName + '/Controllers/ManageController.cs', this.templatedata);
        // compiler
        this.fs.copyTpl(this.sourceRoot() + '/compiler_preprocess_razorprecompilation.cs', this.applicationName + '/Compiler/Preprocess/RazorPreCompilation.cs', this.templatedata);
        //migrations
        this.fs.copyTpl(this.sourceRoot() + '/migrations_000000000000000_createidentityschema.cs', this.applicationName + '/Migrations/000000000000000_CreateIdentitySchema.cs', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/migrations_applicationdbcontextmodelsnapshot.cs', this.applicationName + '/Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);
        // properties
        this.fs.copyTpl(this.sourceRoot() + '/properties_appsettings.cs', this.applicationName + '/Properties/AppSettings.cs', this.templatedata);
        // views
        this.fs.copyTpl(this.sourceRoot() + '/views_account_confirmemail.cshtml', this.applicationName + '/Views/Account/ConfirmEmail.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_externalloginconfirmation.cshtml', this.applicationName + '/Views/Account/ExternalLoginConfirmation.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_externalloginfailure.cshtml', this.applicationName + '/Views/Account/ExternalLoginFailure.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_forgotpassword.cshtml', this.applicationName + '/Views/Account/ForgotPassword.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_forgotpasswordconfirmation.cshtml', this.applicationName + '/Views/Account/ForgotPasswordConfirmation.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_login.cshtml', this.applicationName + '/Views/Account/Login.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_register.cshtml', this.applicationName + '/Views/Account/Register.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_resetpassword.cshtml', this.applicationName + '/Views/Account/ResetPassword.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_resetpasswordconfirmation.cshtml', this.applicationName + '/Views/Account/ResetPasswordConfirmation.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_sendcode.cshtml', this.applicationName + '/Views/Account/SendCode.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_account_verifycode.cshtml', this.applicationName + '/Views/Account/VerifyCode.cshtml', this.templatedata);

        this.fs.copyTpl(this.sourceRoot() + '/views_home_contact.cshtml', this.applicationName + '/Views/Home/Contact.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_home_about.cshtml', this.applicationName + '/Views/Home/About.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_home_index.cshtml', this.applicationName + '/Views/Home/Index.cshtml', this.templatedata);

        this.fs.copyTpl(this.sourceRoot() + '/views_manage_addphonenumber.cshtml', this.applicationName + '/Views/Manage/AddPhoneNumber.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_manage_changepassword.cshtml', this.applicationName + '/Views/Manage/ChangePassword.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_manage_index.cshtml', this.applicationName + '/Views/Manage/Index.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_manage_managelogins.cshtml', this.applicationName + '/Views/Manage/ManageLogins.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_manage_removelogin.cshtml', this.applicationName + '/Views/Manage/RemoveLogin.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_manage_setpassword.cshtml', this.applicationName + '/Views/Manage/SetPassword.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_manage_verifyphonenumber.cshtml', this.applicationName + '/Views/Manage/VerifyPhoneNumber.cshtml', this.templatedata);

        this.fs.copyTpl(this.sourceRoot() + '/views_shared_error.cshtml', this.applicationName + '/Views/Shared/Error.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_shared_layout.cshtml', this.applicationName + '/Views/Shared/_Layout.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_shared_loginpartial.cshtml', this.applicationName + '/Views/Shared/_LoginPartial.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_shared_validationscriptspartial.cshtml', this.applicationName + '/Views/Shared/_ValidationScriptsPartial.cshtml', this.templatedata);

        this.fs.copyTpl(this.sourceRoot() + '/views_globalimport.cshtml', this.applicationName + '/Views/_GlobalImport.cshtml', this.templatedata);
        this.fs.copyTpl(this.sourceRoot() + '/views_viewstart.cshtml', this.applicationName + '/Views/_ViewStart.cshtml', this.templatedata);

        /// wwwroot
        this.directory(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
        break;
      case 'nancy':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

        this.template(this.sourceRoot() + '/homemodule.cs', this.applicationName + '/HomeModule.cs', this.templatedata);

        break;
      case 'console':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/program.cs', this.applicationName + '/Program.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

        break;
      case 'classlib':
        this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

        this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

        this.template(this.sourceRoot() + '/class.cs', this.applicationName + '/Class1.cs', this.templatedata);

        this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

        break;
      case 'unittest':
        this.sourceRoot(path.join(__dirname, '../samples'));
        this.fs.copy(this.templatePath(this.type), this.destinationPath(this.applicationName));
        break;
      default:
        this.log('Unknown project type');
    }
  },

  end: function() {
    this.log('\r\n');
    this.log('Your project is now created, you can use the following commands to get going');
    this.log(chalk.green('    dnu restore'));
    this.log(chalk.green('    dnu build'));
    this.log(chalk.green('    dnx . run') + ' for console projects');
    this.log(chalk.green('    dnx . kestrel') + ' or ' + chalk.green('dnx . web') + ' for web projects');
    this.log('\r\n');

  }
});

module.exports = AspnetGenerator;
