'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var AspnetGenerator = yeoman.generators.Base.extend({

    init: function () {
        this.log(yosay('Welcome to the marvellous ASP.NET 5 generator!'));
    },

    askFor: function () {
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'type',
            message: 'What type of application do you want to create?',
            choices: [
                {
                    name: 'Console Application',
                    value: 'console'
                },
                {
                    name: 'Web Application',
                    value: 'web'
                },
                {
                    name: 'MVC Application',
                    value: 'mvc'
                },
                {
                    name: 'Nancy ASP.NET Application',
                    value: 'nancy'
                },
                {
                    name: 'Class Library',
                    value: 'classlib'
                },
		{
                    name: 'Unit test project',
                    value: 'unittest'
                }
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
        case 'console':
            app = 'ConsoleApplication';
            break;
        case 'web':
            app = 'WebApplication';
            break;
        case 'mvc':
            app = 'MvcApplication';
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
        } ];
        this.prompt(prompts, function (props) {
            this.applicationName = props.applicationName;

            done();
        }.bind(this));
    },

    retrieveContent: function () {
        var done = this.async();
        var self = this;
        this.remote('OmniSharp', 'generator-aspnet', 'release', function (err, remote) {
            if(err) {
                self.log.error(err);
                process.exit(1);
            }
            done();
        }, true);
    },

    writing: function () {
        this.mkdir(this.applicationName);
        switch (this.type) {
        case 'console':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/release/samples/console', this.applicationName);
            break;
        case 'web':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/release/samples/web', this.applicationName);
            break;
        case 'mvc':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/release/samples/mvc', this.applicationName);
            break;
        case 'nancy':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/release/samples/nancy', this.applicationName);
            break;
        case 'classlib':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/release/samples/classlib', this.applicationName);
            break;
	case 'unittest':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/release/samples/unittest', this.applicationName);
            break;
        default:
            this.log('Unknown project type');
        }
    },

    end: function () {
        this.log(this.cacheRoot());
        if (!this.options['skip-install']) {
            this.log('\r\n');
            this.log('Your project is now created, you can use the following commands to get going');
            this.log(chalk.green('    kpm restore'));
            this.log(chalk.green('    kpm build'));
            this.log(chalk.green('    k run') + ' for console projects');
            this.log(chalk.green('    k kestrel') + ' or ' + chalk.green('k web') + 'for web projects');
            this.log('\r\n');
        }
    }
});

module.exports = AspnetGenerator;
