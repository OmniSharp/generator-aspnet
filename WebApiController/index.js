'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var cfg = require('../configuration');
var path = require('path');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  var extension = '.cs';
  this.generateTemplateFile(
    'WebApiController.cs',
    extension, {
      namespace: this.namespace(),
      classname: this.classNameWithoutExtension(extension)
    }
  );
};
