'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  var extension = '.cs';
  // foo\bar\baz\wibble.cs becomes
  //   namespaceSuffix: foo.bar.baz
  //   classname: wibble
  var namespace = this.namespace();
  var pathSegments = this.classNameWithoutExtension(extension).replace(/\//g, '\\').split('\\');
  var namespaceSuffix = pathSegments.slice(0, -1).join('.');
  if (namespaceSuffix !== '') {
    namespace += "." + namespaceSuffix;
  }
  var classname = pathSegments[pathSegments.length-1];
  this.generateTemplateFile(
    'class.cs',
    extension, {
      namespace: namespace,
      classname: classname
    }
  );
};
