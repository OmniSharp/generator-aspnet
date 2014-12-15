'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var NamedGenerator = module.exports = function NamedGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  var sourceRoot = '/templates/';
  this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(NamedGenerator, yeoman.generators.NamedBase);

NamedGenerator.prototype.generateTemplateFile = function(templateFile, targetFile, templateData) {
  this.log('You called the aspnet subgenerator with the arg ' + this.name);

  if(templateData !== null){
    this.template(templateFile, targetFile, templateData);
  } else {
    this.template(templateFile, targetFile);
  }

  this.log(targetFile + ' created.')
}