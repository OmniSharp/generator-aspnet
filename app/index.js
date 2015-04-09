'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var AspnetGenerator = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        // only implemented for web template
        this.option('gulp');
    },


    init: function () {
        this.log(yosay('Welcome to the marvellous ASP.NET 5 generator!'));
        this.templatedata = {};
    },

    askFor: function () {
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'type',
            message: 'What type of application do you want to create?',
            choices: [
                {
                    name: 'Empty Application',
                    value: 'empty'
                },
                {
                    name: 'Console Application',
                    value: 'console'
                },
                {
                    name: 'Web Application',
                    value: 'web'
                },
                {
                    name: 'Web API Application',
                    value: 'webapi'
                },
                {
                    name: 'Nancy ASP.NET Application',
                    value: 'nancy'
                },
                {
                    name: 'Class Library',
                    value: 'classlib'
                },
//                {
//                    name: 'Unit test project',
//                    value: 'unittest'
//                }
            ]
        }];

        this.prompt(prompts, function (props) {
            this.type = props.type;

            done();
        }.bind(this));
    },

    askForName: function () {
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
            app = 'NancyApplication'
            break;
        case 'classlib':
            app = 'ClassLibrary'
            break;
        case 'unittest':
            app = 'UnitTest'
            break;
        }
        var prompts = [{
            name: 'applicationName',
            message: 'What\'s the name of your ASP.NET application?',
            default: app
        }];
        this.prompt(prompts, function (props) {
            this.templatedata.namespace = props.applicationName;
            this.templatedata.applicationname = props.applicationName;
            this.applicationName = props.applicationName;

            done();
        }.bind(this));
    },

    writing: function () {
        this.sourceRoot(path.join(__dirname, './templates/projects'));

        switch (this.type) {

        case 'empty':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type)); 
            this.fs.copyTpl(this.templatePath('/startup.cs'), this.destinationPath(this.applicationName + '/Startup.cs'),  this.templatedata);
            this.fs.copy(this.templatePath('/project.json'), this.destinationPath(this.applicationName + '/project.json'));
            /// wwwroot
            this.fs.copy(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
            break;

        case 'webapi':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
            this.fs.copyTpl(this.templatePath('/startup.cs'), this.destinationPath(this.applicationName + '/Startup.cs'),  this.templatedata);
            this.fs.copy(this.templatePath('/project.json'), this.destinationPath(this.applicationName + '/project.json'));
            this.fs.copyTpl(this.templatePath('/controllers_home.cs'), this.destinationPath(this.applicationName + '/Controllers/HomeController.cs'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/controllers_values.cs'), this.destinationPath(this.applicationName + '/Controllers/ValuesController.cs'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_home_index.cshtml'), this.destinationPath(this.applicationName + '/Views/Home/Index.cshtml'), this.templatedata);
            /// wwwroot
            this.fs.copy(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
            break;

        case 'web':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
            this.fs.copyTpl(this.templatePath('/startup.cs'), this.destinationPath(this.applicationName + '/Startup.cs'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/bower.json'), this.destinationPath(this.applicationName + '/bower.json'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/config.json'), this.destinationPath(this.applicationName + '/config.json'),  this.templatedata);
            if (this.options.gulp) {
                this.fs.copy(this.templatePath('/_gulp_project.json'), this.destinationPath(this.applicationName + '/project.json'));
                this.fs.copyTpl(this.templatePath('/_gulp_package.json'), this.destinationPath(this.applicationName + '/package.json'),  this.templatedata);
                this.fs.copy(this.templatePath('/_gulpfile.js'), this.destinationPath(this.applicationName + '/gulpfile.js'));
            } else {
                this.fs.copy(this.templatePath('/_grunt_project.json'), this.destinationPath(this.applicationName + '/project.json'));
                this.fs.copyTpl(this.templatePath('/_grunt_package.json'), this.destinationPath(this.applicationName + '/package.json'),  this.templatedata);
                this.fs.copy(this.templatePath('/_gruntfile.js'), this.destinationPath(this.applicationName + '/gruntfile.js'));
            }
            // models
            this.fs.copyTpl(this.templatePath('/models_accountview.cs'), this.destinationPath(this.applicationName + '/Models/AccountViewModels.cs'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/models_identity.cs'), this.destinationPath(this.applicationName + '/Models/IdentityModels.cs'),  this.templatedata);
            // controllers
            this.fs.copyTpl(this.templatePath('/controllers_account.cs'), this.destinationPath(this.applicationName + '/Controllers/AccountController.cs'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/controllers_home.cs'), this.destinationPath(this.applicationName + '/Controllers/HomeController.cs'),  this.templatedata);
            // compiler
            this.fs.copyTpl(this.templatePath('/compiler_preprocess_razorprecompilation.cs'), this.destinationPath(this.applicationName + '/Compiler/Preprocess/RazorPreCompilation.cs'),  this.templatedata);
            //migrations
            this.fs.copyTpl(this.templatePath('/migrations_000000000000000_createidentityschema.cs'), this.destinationPath(this.applicationName + '/Migrations/000000000000000_CreateIdentitySchema.cs'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/migrations_applicationdbcontextmodelsnapshot.cs'), this.destinationPath(this.applicationName + '/Migrations/ApplicationDbContextModelSnapshot.cs'),  this.templatedata);
            // views
            this.fs.copyTpl(this.templatePath('/views_home_contact.cshtml'), this.destinationPath(this.applicationName + '/Views/Home/Contact.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_home_about.cshtml'), this.destinationPath(this.applicationName + '/Views/Home/About.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_home_index.cshtml'), this.destinationPath(this.applicationName + '/Views/Home/Index.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_account_login.cshtml'), this.destinationPath(this.applicationName + '/Views/Account/Login.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_account_manage.cshtml'), this.destinationPath(this.applicationName + '/Views/Account/Manage.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_account_register.cshtml'), this.destinationPath(this.applicationName + '/Views/Account/Register.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_account_changepasswordpartial.cshtml'), this.destinationPath(this.applicationName + '/Views/Account/_ChangePasswordPartial.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_shared_error.cshtml'), this.destinationPath(this.applicationName + '/Views/Shared/Error.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_shared_layout.cshtml'), this.destinationPath(this.applicationName + '/Views/Shared/_Layout.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_shared_loginpartial.cshtml'), this.destinationPath(this.applicationName + '/Views/Shared/_LoginPartial.cshtml'),  this.templatedata);
            this.fs.copyTpl(this.templatePath('/views_viewstart.cshtml'), this.destinationPath(this.applicationName + '/Views/_ViewStart.cshtml'),  this.templatedata);
            /// wwwroot
            this.directory(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
            break;
        case 'nancy':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
            this.fs.copyTpl(this.templatePath('/startup.cs'), this.destinationPath(this.applicationName + '/Startup.cs'),  this.templatedata);
            this.fs.copy(this.templatePath('/project.json'), this.destinationPath(this.applicationName + '/project.json'));
            this.fs.copyTpl(this.templatePath('/homemodule.cs'), this.destinationPath(this.applicationName + '/HomeModule.cs'),  this.templatedata);
            break;
        case 'console':
        case 'classlib':
        case 'unittest':
            this.sourceRoot(path.join(__dirname, '../samples'));
            this.fs.copy(this.templatePath(this.type), this.destinationPath(this.applicationName));
            break;
        default:
            this.log('Unknown project type');
        }
    },

    end: function () {
        this.log('\r\n');
        this.log('Your project is now created, you can use the following commands to get going');
        this.log(chalk.green('    kpm restore'));
        this.log(chalk.green('    kpm build'));
        this.log(chalk.green('    k run') + ' for console projects');
        this.log(chalk.green('    k kestrel') + ' or ' + chalk.green('k web') + ' for web projects');
        this.log('\r\n');

    }


});

module.exports = AspnetGenerator;
