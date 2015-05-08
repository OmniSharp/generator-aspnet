'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NamedGenerator = module.exports = function NamedGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, './templates/'));
};

util.inherits(NamedGenerator, yeoman.generators.NamedBase);

NamedGenerator.prototype.generateTemplateFile = function(templateFile, targetFile, templateData) {
  this.log('You called the aspnet subgenerator with the arg ' + this.name);
  if (templateData !== null) {
    this.fs.copyTpl(this.templatePath(templateFile), this.destinationPath(targetFile), templateData);
  } else {
    this.fs.copyTpl(this.templatePath(templateFile), this.destinationPath(targetFile));
  }
  this.log(targetFile + ' created.');
};
