'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  var extension = '.cs';
  this.generateTemplateFile(
    'TagHelper.cs',
    extension, {
      namespace: this.namespace(),
      classname: this.classNameWithoutExtension(extension)
    }
  );
};
