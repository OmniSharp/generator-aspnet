'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');

var NamedGenerator = module.exports = function NamedGenerator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function(){
	this.generateTemplateFile(
		'gruntfile.js',
		this.name + '.js'
	);
};
