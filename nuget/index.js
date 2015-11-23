'use strict';
var util = require('util');
var ScriptBase = require('../script-base-basic.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createItem = function() {
  // supports unstable feed via optional --unstable cli argument
  this.generateTemplateFile(
    '_nuget.config',
    'NuGet.config', {
      unstable: (this.options.unstable ? this.options.unstable : false)
    }
  );
};
