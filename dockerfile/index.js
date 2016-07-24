'use strict';
var util = require('util');
var ScriptBase = require('../script-base-basic.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createItem = function() {
  // support SQLite library is provided by sqlite option
  // is provided by --sqlite option
  this.generateTemplateFile(
    'Dockerfile.txt',
    'Dockerfile', {
      sqlite: (this.options.sqlite) ? this.options.sqlite : false
  });
};
