'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var cfg = require('../configuration');
var path = require('path');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);

  // If we're in the root, create the new view in the Views folder
  if (process.cwd() === path.dirname(cfg.getProjectJsonPath())) {
    process.chdir(path.join(process.cwd(), 'Views'));
  }
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  var extension = '.cshtml';
  this.generateTemplateFile(
    'MvcView.cshtml',
    extension, {
      pagename: this.classNameWithoutExtension(extension)
    }
  );
};
