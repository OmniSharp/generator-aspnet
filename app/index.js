'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');



var AspnetGenerator = yeoman.generators.Base.extend({

    init: function () {
        this.log(yosay('Welcome to the marvellous ASP.NET generator!'));
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
        this.remote('OmniSharp', 'generator-aspnet', 'master', function (err, remote) {
                done();
            }, true);
    },

    writing: function () {
        this.mkdir(this.applicationName);
        switch (this.type) {
        case 'console':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/master/samples/console', this.applicationName);
            break;
        case 'web':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/master/samples/web', this.applicationName);
            break;
        case 'mvc':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/master/samples/mvc', this.applicationName);
            break;
        case 'nancy':
            this.directory(this.cacheRoot() + '/OmniSharp/generator-aspnet/master/samples/nancy', this.applicationName);
            break;
        default:
            console.log('Unknown project type');
        }
    },

    end: function () {
        console.log(this.cacheRoot());
        if (!this.options['skip-install']) {
            this.config.set('skip-install', true)
            
            console.log('\r\nYour project is now created, you can use the following commands to get going');
            console.log(chalk.green('    kpm restore'));
            console.log(chalk.green('    kpm build'));
            console.log(chalk.green('    k run'),' for console projects');
            console.log(chalk.green('    k kestrel'),'or',chalk.green('k web'), 'for web projects\r\n');
        }
    }
});

module.exports = AspnetGenerator;
