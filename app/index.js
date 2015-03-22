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

        this.mkdir(this.applicationName);
        var tpl = function(src, dest) {
                this.template(
                    src,
                    path.join(this.applicationName, dest),
                    this.templatedata
                )
            }.bind(this),
            cpy = function(src, dest) {
                this.copy(
                    src,
                    path.join(this.applicationName, dest)
                )
            }.bind(this),
            dir = function(src, dest) {
                this.directory(
                    src,
                    path.join(this.applicationName, dest)
                )
            }.bind(this);

        switch (this.type) {
        case 'empty':
        case 'webapi':
        case 'web':
        case 'nancy':
            this.sourceRoot(path.join(__dirname, '..', 'templates', 'projects', this.type));
            break;
        case 'console':
        case 'classlib':
        case 'unittest':
            this.sourceRoot(path.join(__dirname, '..', 'samples'));
        }

        switch (this.type) {

        case 'empty':
            tpl('startup.cs', 'Startup.cs');
            cpy('project.json', 'project.json');
            /// wwwroot
            dir('wwwroot', 'wwwroot');
            break;

        case 'webapi':
            tpl('startup.cs', 'Startup.cs');
            cpy('project.json', 'project.json');
            tpl('controllers_home.cs', 'Controllers/HomeController.cs');
            tpl('controllers_values.cs', 'Controllers/ValuesController.cs');
            tpl('views_home_index.cshtml', 'Views/Home/Index.cshtml');

            /// wwwroot
            dir('wwwroot', 'wwwroot');
            break;

        case 'web':
            tpl('startup.cs', 'Startup.cs');
            tpl('bower.json', 'bower.json');
            tpl('config.json', 'config.json');

            if (this.options.gulp) {
                cpy('_gulp_project.json', 'project.json');
                tpl('_gulp_package.json', 'package.json');
                cpy('_gulpfile.js', 'gulpfile.js');
            } else {
                cpy('_grunt_project.json', 'project.json');
                tpl('_grunt_package.json', 'package.json');
                cpy('_gruntfile.js', 'gruntfile.js');
            }
            // models
            tpl('models_accountview.cs', 'Models/AccountViewModels.cs');
            tpl('models_identity.cs', 'Models/IdentityModels.cs');
            // controllers
            tpl('controllers_account.cs', 'Controllers/AccountController.cs');
            tpl('controllers_home.cs', 'Controllers/HomeController.cs');
            // compiler
            tpl('compiler_preprocess_razorprecompilation.cs', 'Compiler/Preprocess/RazorPreCompilation.cs');
            //migrations
            tpl('migrations_000000000000000_createidentityschema.cs', 'Migrations/000000000000000_CreateIdentitySchema.cs');
            tpl('migrations_applicationdbcontextmodelsnapshot.cs', 'Migrations/ApplicationDbContextModelSnapshot.cs');
            // views
            tpl('views_home_contact.cshtml', 'Views/Home/Contact.cshtml');
            tpl('views_home_about.cshtml', 'Views/Home/About.cshtml');
            tpl('views_home_index.cshtml', 'Views/Home/Index.cshtml');
            tpl('views_account_login.cshtml', 'Views/Account/Login.cshtml');
            tpl('views_account_manage.cshtml', 'Views/Account/Manage.cshtml');
            tpl('views_account_register.cshtml', 'Views/Account/Register.cshtml');
            tpl('views_account_changepasswordpartial.cshtml', 'Views/Account/_ChangePasswordPartial.cshtml');
            tpl('views_shared_error.cshtml', 'Views/Shared/Error.cshtml');
            tpl('views_shared_layout.cshtml', 'Views/Shared/_Layout.cshtml');
            tpl('views_shared_loginpartial.cshtml', 'Views/Shared/_LoginPartial.cshtml');
            tpl('views_viewstart.cshtml', 'Views/_ViewStart.cshtml');
            /// wwwroot
            dir('wwwroot', 'wwwroot');
            break;
        case 'nancy':
            tpl('startup.cs', 'Startup.cs');
            cpy('project.json', 'project.json');
            tpl('homemodule.cs', 'HomeModule.cs');
            break;
        case 'console':
        case 'classlib':
        case 'unittest':
            dir(this.type, '');
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
