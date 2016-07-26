'use strict';
var util = require('util');
var ScriptBase = require('../script-base-basic');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createItem = function() {
  this.generateTemplateFile('Startup.cs', 'Startup.cs', { namespace: this.namespace() });
};
