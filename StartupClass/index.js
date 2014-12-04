'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AspnetItemGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the aspnet subgenerator to create Startup.cs .');
  },

  writing: function () {
    
  	this.template('Startup.cs', 'Startup.cs', { namespace: 'MyNamespace'});
  
  }
});

module.exports = AspnetItemGenerator;
