'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  var sourceRoot = '/templates/';
  this.sourceRoot(path.join(__dirname, sourceRoot));
}; 

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.generateStandardFile = function(sourceFile, targetFile){
   this.log('You called the aspnet subgenerator with the arg ' + sourceFile);

  this.src.copy(sourceFile, targetFile);

  this.log(targetFile + ' created.')
}