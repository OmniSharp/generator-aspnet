'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AspnetItemGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the aspnet subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
  	var fileName = this.name + '.cs';
  	this.template('Controller.cs', fileName, { namespace: 'MyNamespace', classname: this.name });
  	this.log(fileName + ' created.');
  }
});

module.exports = AspnetItemGenerator;
