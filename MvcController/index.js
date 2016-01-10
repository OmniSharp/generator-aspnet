'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var cfg = require('../configuration');
var path = require('path');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);

  // If we're in the root, create the new controller in the Controllers folder
  if (process.cwd() === path.dirname(cfg.getProjectJsonPath())) {
    process.chdir(path.join(process.cwd(), 'Controllers'));
  }
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  var extension = '.cs';
  this.generateTemplateFile(
    'MvcController.cs',
    extension, {
      namespace: this.namespace(),
      classname: this.classNameWithoutExtension(extension)
    }
  );
};
