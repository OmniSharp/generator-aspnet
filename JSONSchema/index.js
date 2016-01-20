'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  var extension = '.json';
  this.generateTemplateFile(
    'JSONSchema.json',
    extension, {
      name: this.classNameWithoutExtension(extension)
    }
  );
};
