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

        this.pkg = require('../package.json');
        this.config.save();

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
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

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', {
                namespace: this.applicationName
            });

            this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

            /// wwwroot
            this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');

            break;

        case 'webapi':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', {
                namespace: this.applicationName
            });

            this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

            this.template(this.sourceRoot() + '/controllers_home.cs', this.applicationName + '/Controllers/HomeController.cs', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/controllers_values.cs', this.applicationName + '/Controllers/ValuesController.cs', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_home_index.cshtml', this.applicationName + '/Views/Home/Index.cshtml');

            /// wwwroot
            this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');

            break;

        case 'web':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/bower.json', this.applicationName + '/bower.json', {
                applicationname: this.applicationName
            });

            this.template(this.sourceRoot() + '/config.json', this.applicationName + '/config.json', {
                namespace: this.applicationName
            });

            if (this.options.gulp) {
                this.copy(this.sourceRoot() + '/_gulp_project.json', this.applicationName + '/project.json');

                this.template(this.sourceRoot() + '/_gulp_package.json', this.applicationName + '/package.json', {
                    applicationname: this.applicationName
                });

                this.copy(this.sourceRoot() + '/_gulpfile.js', this.applicationName + '/gulpfile.js');

            } else {

                this.copy(this.sourceRoot() + '/_grunt_project.json', this.applicationName + '/project.json');

                this.template(this.sourceRoot() + '/_grunt_package.json', this.applicationName + '/package.json', {
                    applicationname: this.applicationName
                });

                this.copy(this.sourceRoot() + '/_gruntfile.js', this.applicationName + '/gruntfile.js');
            }

            // models
            this.template(this.sourceRoot() + '/models_accountview.cs', this.applicationName + '/Models/AccountViewModels.cs', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/models_identity.cs', this.applicationName + '/Models/IdentityModels.cs', {
                namespace: this.applicationName
            });

            // controllers
            this.template(this.sourceRoot() + '/controllers_account.cs', this.applicationName + '/Controllers/AccountController.cs', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/controllers_home.cs', this.applicationName + '/Controllers/HomeController.cs', {
                namespace: this.applicationName
            });

            // compiler
            this.template(this.sourceRoot() + '/compiler_preprocess_razorprecompilation.cs', this.applicationName + '/Compiler/Preprocess/RazorPreCompilation.cs', {
                namespace: this.applicationName
            });

            //migrations
            this.template(this.sourceRoot() + '/migrations_000000000000000_createidentityschema.cs', this.applicationName + '/Migrations/000000000000000_CreateIdentitySchema.cs', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/migrations_applicationdbcontextmodelsnapshot.cs', this.applicationName + '/Migrations/ApplicationDbContextModelSnapshot.cs', {
                namespace: this.applicationName
            });

            // views
            this.template(this.sourceRoot() + '/views_home_contact.cshtml', this.applicationName + '/Views/Home/Contact.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_home_about.cshtml', this.applicationName + '/Views/Home/About.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_home_index.cshtml', this.applicationName + '/Views/Home/Index.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_account_login.cshtml', this.applicationName + '/Views/Account/Login.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_account_manage.cshtml', this.applicationName + '/Views/Account/Manage.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_account_register.cshtml', this.applicationName + '/Views/Account/Register.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_account_changepasswordpartial.cshtml', this.applicationName + '/Views/Account/_ChangePasswordPartial.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_shared_error.cshtml', this.applicationName + '/Views/Shared/Error.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_shared_layout.cshtml', this.applicationName + '/Views/Shared/_Layout.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_shared_loginpartial.cshtml', this.applicationName + '/Views/Shared/_LoginPartial.cshtml', {
                namespace: this.applicationName
            });

            this.template(this.sourceRoot() + '/views_viewstart.cshtml', this.applicationName + '/Views/_ViewStart.cshtml', {
                namespace: this.applicationName
            });

            /// wwwroot
            this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');
            break;
        case 'nancy':
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', {
                namespace: this.applicationName
            });

            this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

            this.template(this.sourceRoot() + '/homemodule.cs', this.applicationName + '/HomeModule.cs', {
                namespace: this.applicationName
            });
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
    askForFontAwesome: function () {
        var cb = this.async();

        // have Yeoman greet the user.
        this.log(this.yeoman);

        this.log(chalk.bold.blue('=================='));
        this.log(chalk.bold.red(' Yo Foundation 5! for Visual Studio'));
        this.log(chalk.bold.blue('=================='));

        var prompts = {
            type: 'confirm',
            name: 'fontAwesome',
            message: 'Would you like to include Font Awesome? (Font Awesome gives you scalable vector icons..)',
            default: true
        };

        this.prompt(prompts, function (props) {
            this.fontAwesome = props.fontAwesome;

            cb();
        }.bind(this));
    },

    askForCompass: function () {
        var cb = this.async();

        var prompts = {
            type: 'confirm',
            name: 'compass',
            message: 'Would you like to use Scss with Compass? (default: Scss with Libsass)',
            default: false
        };

        this.prompt(prompts, function (props) {
            this.compass = props.compass;

            cb();
        }.bind(this));
    },

    askForJade: function () {
        var cb = this.async();

        var prompts = {
            type: 'confirm',
            name: 'jade',
            message: 'Would you like to use Jade? (templating engine) [experimental]',
            default: false
        };

        this.prompt(prompts, function (props) {
            this.jade = props.jade;

            cb();
        }.bind(this));
    },

    template: function () {
        this.mkdir('dist');
        this.mkdir('app');
        this.template('bower.json', 'bower.json');
        this.template('package.json', 'package.json');
        this.template('Gruntfile.js', 'Gruntfile.js');
        this.copy('.jshintrc', '.jshintrc');
        this.copy('.bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
        this.copy('README.md', 'README.md');
        if (this.jade) {
            this.template('jade/index.jade', 'app/index.jade');
            this.template('jade/header.jade', 'app/header.jade');
            this.copy('jade/footer.jade', 'app/footer.jade');
        } else {
            this.template('index.html', 'app/index.html');
            this.template('index.cshtml', 'app/index.cshtml');
            this.template('_layout.cshtml', 'app/_Layout.cshtml');
        }
        this.mkdir('app/fonts');
        this.mkdir('app/images');
        this.mkdir('app/js');
        this.mkdir('app/css');
        this.mkdir('app/scss');
        this.copy('scss/app.scss', 'app/scss/app.scss');
        this.copy('scss/_settings.scss', 'app/scss/_settings.scss');
        this.template('scss/_appstyles.scss', 'app/scss/_appstyles.scss');
        this.copy('js/app.js', 'app/js/app.js');
        this.copy('css/template_override.css', 'app/css/app_override.css');
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
