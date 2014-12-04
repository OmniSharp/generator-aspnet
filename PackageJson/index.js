'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AspnetItemGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the aspnet subgenerator with the argument package.json .');
  },

  writing: function () {
    this.src.copy('package.json', 'package.json');
    this.log('package.json created.');
  }
});

module.exports = AspnetItemGenerator;
