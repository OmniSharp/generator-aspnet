'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');



var AspnetGenerator = yeoman.generators.Base.extend({
    
    init: function () {
        this.log(yosay('Welcome to the marvelous Aspnet generator!'));
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

        var app = (this.type == 'console'? 'ConsoleApplication1' : (this.type == 'web' ? 'WebApplication1' : 'MvcApplication1'))
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

        this.remote('ligershark', 'aspnet_vnext_samples', 'master', function(err, remote) {
            done();
        },true);
    },

    writing: function () {
        this.copy(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/NuGet.config', 'NuGet.config');
        this.mkdir(this.applicationName);
        switch(this.type) {
            case 'console':
                this.directory(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/console', this.applicationName);
                break;
            case 'web':
                this.directory(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/web', this.applicationName);
                break;
            case 'mvc':
                this.directory(this.cacheRoot() + '/ligershark/aspnet_vnext_samples/master/mvc', this.applicationName);
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
