'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var NamedGenerator = module.exports = function NamedGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, './templates/'));

  this.namespace = function() {
    return require('./config').getNamespace(this.fs);
  }.bind(this);
};

util.inherits(NamedGenerator, yeoman.generators.NamedBase);

NamedGenerator.prototype.generateTemplateFile = function(templateFile, targetFile, templateData) {
  this.log('You called the aspnet subgenerator with the arg ' + chalk.green(this.arguments[0] || targetFile));
  if (templateData !== null) {
    this.fs.copyTpl(this.templatePath(templateFile), this.destinationPath(targetFile), templateData);
  } else {
    this.fs.copyTpl(this.templatePath(templateFile), this.destinationPath(targetFile));
  }
  this.log(chalk.green(targetFile) + ' created.');
};
