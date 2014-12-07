'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

//var NamedGenerator = module.exports = function NamedGenerator() {
//  yeoman.generators.NamedBase.apply(this, arguments);

//  var sourceRoot = '/templates/';
//  this.sourceRoot(path.join(__dirname, sourceRoot));
//};


var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  var sourceRoot = '/templates/';
  this.sourceRoot(path.join(__dirname, sourceRoot));
}; 

//util.inherits(Generator, yeoman.generators.Base);
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

//Generator.prototype.generateStandardFile = function(sourceFile, targetFile){
//  this.log('You called the aspnet subgenerator with the arg ' + sourceFile);

//  this.src.copy(sourceFile, targetFile);

//  this.log(targetFile + ' created.')
//}