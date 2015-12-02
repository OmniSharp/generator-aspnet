'use strict';
var util = require('util');
var ScriptBase = require('../script-base-basic.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createItem = function() {
  // support CoreCLR runtime version of Docker image
  // is provided by --coreclr option
  this.generateTemplateFile(
    'Dockerfile.txt', 
    'Dockerfile', {
      coreclr: (this.options.coreclr) ? this.options.coreclr : false
  });
};
