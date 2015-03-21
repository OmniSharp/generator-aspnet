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
        this.sourceRoot(path.join(__dirname, '../samples/'));

        this.mkdir(this.applicationName);
        switch (this.type) {

        case 'empty':

            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs',  this.templatedata);

            this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

            /// wwwroot
            this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');

            break;

        case 'webapi':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs',  this.templatedata);

            this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

            this.template(this.sourceRoot() + '/controllers_home.cs', this.applicationName + '/Controllers/HomeController.cs',  this.templatedata);

            this.template(this.sourceRoot() + '/controllers_values.cs', this.applicationName + '/Controllers/ValuesController.cs',  this.templatedata);

            this.template(this.sourceRoot() + '/views_home_index.cshtml', this.applicationName + '/Views/Home/Index.cshtml', this.templatedata);

            /// wwwroot
            this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');

            break;

        case 'web':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs',  this.templatedata);

            this.template(this.sourceRoot() + '/bower.json', this.applicationName + '/bower.json',  this.templatedata);

            this.template(this.sourceRoot() + '/config.json', this.applicationName + '/config.json',  this.templatedata);

            if (this.options.gulp) {
                this.copy(this.sourceRoot() + '/_gulp_project.json', this.applicationName + '/project.json');

                this.template(this.sourceRoot() + '/_gulp_package.json', this.applicationName + '/package.json',  this.templatedata);

                this.copy(this.sourceRoot() + '/_gulpfile.js', this.applicationName + '/gulpfile.js');

            } else {

                this.copy(this.sourceRoot() + '/_grunt_project.json', this.applicationName + '/project.json');

                this.template(this.sourceRoot() + '/_grunt_package.json', this.applicationName + '/package.json',  this.templatedata);

                this.copy(this.sourceRoot() + '/_gruntfile.js', this.applicationName + '/gruntfile.js');
            }

            // models
            this.template(this.sourceRoot() + '/models_accountview.cs', this.applicationName + '/Models/AccountViewModels.cs',  this.templatedata);

            this.template(this.sourceRoot() + '/models_identity.cs', this.applicationName + '/Models/IdentityModels.cs',  this.templatedata);

            // controllers
            this.template(this.sourceRoot() + '/controllers_account.cs', this.applicationName + '/Controllers/AccountController.cs',  this.templatedata);

            this.template(this.sourceRoot() + '/controllers_home.cs', this.applicationName + '/Controllers/HomeController.cs',  this.templatedata);

            // compiler
            this.template(this.sourceRoot() + '/compiler_preprocess_razorprecompilation.cs', this.applicationName + '/Compiler/Preprocess/RazorPreCompilation.cs',  this.templatedata);

            //migrations
            this.template(this.sourceRoot() + '/migrations_000000000000000_createidentityschema.cs', this.applicationName + '/Migrations/000000000000000_CreateIdentitySchema.cs',  this.templatedata);

            this.template(this.sourceRoot() + '/migrations_applicationdbcontextmodelsnapshot.cs', this.applicationName + '/Migrations/ApplicationDbContextModelSnapshot.cs',  this.templatedata);

            // views
            this.template(this.sourceRoot() + '/views_home_contact.cshtml', this.applicationName + '/Views/Home/Contact.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_home_about.cshtml', this.applicationName + '/Views/Home/About.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_home_index.cshtml', this.applicationName + '/Views/Home/Index.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_account_login.cshtml', this.applicationName + '/Views/Account/Login.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_account_manage.cshtml', this.applicationName + '/Views/Account/Manage.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_account_register.cshtml', this.applicationName + '/Views/Account/Register.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_account_changepasswordpartial.cshtml', this.applicationName + '/Views/Account/_ChangePasswordPartial.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_shared_error.cshtml', this.applicationName + '/Views/Shared/Error.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_shared_layout.cshtml', this.applicationName + '/Views/Shared/_Layout.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_shared_loginpartial.cshtml', this.applicationName + '/Views/Shared/_LoginPartial.cshtml',  this.templatedata);

            this.template(this.sourceRoot() + '/views_viewstart.cshtml', this.applicationName + '/Views/_ViewStart.cshtml',  this.templatedata);

            /// wwwroot
            this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');
            break;
        case 'nancy':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs',  this.templatedata);

            this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

            this.template(this.sourceRoot() + '/homemodule.cs', this.applicationName + '/HomeModule.cs',  this.templatedata);
            break;
        case 'console':
        case 'classlib':
        case 'unittest':
            this.directory(this.type, this.applicationName);
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
