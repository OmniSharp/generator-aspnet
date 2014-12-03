'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AspnetItemGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the aspnet subgenerator with the argument bower.json .');
  },

  writing: function () {
    this.src.copy('bower.json', 'bower.json');
    this.log('bower.json created.')
  }
});

module.exports = AspnetItemGenerator;
