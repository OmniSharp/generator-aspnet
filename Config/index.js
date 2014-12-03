'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AspnetItemGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the aspnet subgenerator with the argument config.json .');
  },

  writing: function () {
    this.src.copy('Config.json', 'config.json');
    this.log('config.json created.')
  }
});

module.exports = AspnetItemGenerator;
