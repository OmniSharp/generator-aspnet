'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');



var AspnetGenerator = yeoman.generators.Base.extend({

    init: function () {
        this.log(yosay('Welcome to the marvellous Aspnet generator!'));
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
                    name: 'Nancy ASP.Net Application',
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
            app = 'ConsoleApplication1';
            break;
        case 'web':
            app = 'WebApplication1';
            break;
        case 'mvc':
            app = 'MvcApplication1';
            break;
        case 'nancy':
            app = 'NancyApplication'
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

    retrieveContent: function () {
        var done = this.async();
        if (this.type === 'nancy') {
            this.remote('jchannon', 'aspnet_vnext_samples', function (err, remote) {
                done();
            });
        } else {
            this.remote('ligershark', 'aspnet_vnext_samples', function (err, remote) {
                done();
            });
        }
    },

    writing: function () {
        if (this.type === 'nancy') {
            this.copy(this.cacheRoot() + '/jchannon/aspnet_vnext_samples/master/NuGet.config', 'NuGet.config');
        } else {
            this.copy(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/NuGet.config', 'NuGet.config');
        }
        this.mkdir(this.applicationName);
        switch (this.type) {
        case 'console':
            this.directory(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/console', this.applicationName);
            break;
        case 'web':
            this.directory(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/web', this.applicationName);
            break;
        case 'mvc':
            this.directory(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/mvc', this.applicationName);
            break;
        case 'nancy':
            this.directory(this.cacheRoot() + '/jchannon/aspnet_vnext_samples/master/web', this.applicationName);
            break;
        default:
            console.log('Unimplemented');
        }
    },

    end: function () {
        console.log(this.cacheRoot());
        if (!this.options['skip-install']) {
            this.config.set('skip-install', true)
            //this.installDependencies();
            this.spawnCommand('kpm', ['restore', './' + this.applicationName]);
        }
    }
});

module.exports = AspnetGenerator;
