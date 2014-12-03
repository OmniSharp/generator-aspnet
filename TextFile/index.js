'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AspnetItemGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the aspnet subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
  	var fileName = this.name + '.txt';
    this.src.copy('TextFile.txt', fileName);
    this.log(fileName + ' created.');
  }
});

module.exports = AspnetItemGenerator;
