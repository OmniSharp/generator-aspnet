'use strict';
var util = require('util');
var ScriptBase = require('../script-base-basic.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createItem = function() {
  // support optional .txt extension by --txt option
  var filename = util.format('README.%s', (this.options.txt) ? 'txt' : 'md');
  this.generateTemplateFile(
    'README.md',
    filename, {
      namespace: this.namespace()
  });
};
