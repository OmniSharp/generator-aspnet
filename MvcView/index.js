'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  this.generateTemplateFile(
    'MvcView.cshtml',
    this.name + '.cshtml', {
      pagename: this.name
    }
  );
};
