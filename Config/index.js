'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base');

var Generator = module.exports = function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createItem = function(){
	this.generateStandardFile('config.json', 'config.json');
};


