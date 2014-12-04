'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var ScriptBase = require('../script-base.js');


var NamedGenerator = module.exports = function NamedGenerator() {
	ScriptBase.apply(this, arguments);

}

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function(){
	this.generateTemplateFile(
		'mvccontroller.cs',
		this.name + '.cs',
		{ namespace: 'MyNamespace', classname: this.name }	
	);
};

