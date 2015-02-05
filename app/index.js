'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
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
        case 'empty':
            app = 'EmptyApplication';
            break;
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
            this.template(this.type + '/startup.cs', this.applicationName + '/Startup.cs', {
                namespace: this.applicationName
            });

            this.copy(this.type + '/project.json', this.applicationName + '/project.json');

            break;

        case 'console':
        case 'web':
        case 'mvc':
        case 'nancy':
        case 'classlib':
        case 'unittest':
            this.directory(this.type, this.applicationName);
            break;
        default:
            this.log('Unknown project type');
        }
    },

    end: function () {
        //this.log(this.cacheRoot());
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