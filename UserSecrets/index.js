'use strict';
var chalk = require('chalk');
var Configuration = require('../configuration');
var green = chalk.green;
var nConf = require('nconf');
var red = chalk.bold.red;
var ScriptBase = require('../script-base-basic.js');
var util = require('util');
var uuid = require('uuid');
var yellow = chalk.yellow;

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

/**
 * A task done by this generator
 * Searches for project.json and adds UserSecrets
 * required configuration keys:
 * - userSecretsId
 * - dependency entry
 */
Generator.prototype.createItem = function() {
  var project = this._getProject();
  if (!project) {
    return;
  }
  // #1 add (but not update): userSecretsId key with new hash
  var userSecetIdUpdated = this._updateUserSecretsId(project);
  // #2 add (but not update): NuGet UserSecrets package dependency
  var depsUpdated = this._updateDependencies(project);
  // if there was a change in project flush changes back to disk
  if (userSecetIdUpdated || depsUpdated) {
    this.log('Writing changes back to project.json file');
    var self = this;
    project.save(this._projectPath, function(error) {
      if (error) {
        self.log(red('Error when updating project.json file!'));
        self.log(red(error));
        return;
      }
      self.log(green('All done! The changes were saved to project file.'));
      var USER_SECRETS_DOCS = 'https://docs.asp.net/en/latest/security/app-secrets.html';
      self.log("For more information about UserSecrets please visit: %s", yellow(USER_SECRETS_DOCS));
    });
  } else {
    this.log(green('All done! No changes were made.'));
  }
};

Generator.prototype._projectPath = null;
/**
 * Creates unique hash for ASP.NET5 userSecretId key
 * @return {String} unique hash token
 */
Generator.prototype._generateUserSecretId = function() {
  var HASH_PREFIX = 'aspnet5';
  var namespace = this.namespace();
  var guid = uuid.v4();
  var userSecretId = util.format('%s-%s-%s', HASH_PREFIX, namespace, guid);
  return userSecretId || '';
};

/**
 * Reads projects.json and returns an object
 * via {nconfg} store
 * @return {nconfg} a project
 */
Generator.prototype._getProject = function() {
  // get path to project.json using extensions
  this._projectPath = Configuration.getProjectJsonPath();
  // no-op if project.json is not found
  if (this._projectPath === null) {
    this.log(red('Cannot find project.json file!'));
    this.log('You need to invoke this generator from within an ASP.NET 5 project');
    return null;
  }
  this.log("project.json found: %s", green(this._projectPath));
  // The adding UserSecrets is two step process:
  // both require that we load project.json, make changes and save it back
  var project = nConf.file({
    file: this._projectPath
  });
  return project;
};

/**
 * Updates userSecretsId key in project file
 * @param  {Object} project representation with nconf store
 * @return {Boolean} true, if userSecretsId key has been updated
 */
Generator.prototype._updateUserSecretsId = function(project) {
  if (!project) {
    return false;
  }
  var updated = false;
  var USER_SECRETS_ID_KEY = 'userSecretsId';
  // do not update existing userSecretsId keys!
  var currentUserSecretId = project.get(USER_SECRETS_ID_KEY);
  if (currentUserSecretId) {
    this.log('Existing %s found with value: %s', USER_SECRETS_ID_KEY, green(currentUserSecretId));
    this.log('Adding %s key: %s', USER_SECRETS_ID_KEY, yellow("skipped"));
  } else {
    var newUserSecretIdValue = this._generateUserSecretId();
    updated = project.set(USER_SECRETS_ID_KEY, newUserSecretIdValue);
    if (updated === false) {
      this.log('Adding %s: %s %s', USER_SECRETS_ID_KEY, newUserSecretIdValue, red("failure"));
    } else {
      this.log('Adding %s: %s %s', USER_SECRETS_ID_KEY, newUserSecretIdValue, green("success"));
    }
  }
  return updated;
};

/**
 * Updates project dependencies with UserSecrets
 * @param  {Object} project representation with nconf store
 * @return {Boolean} true, if project dependencies has been updated
 */
Generator.prototype._updateDependencies = function(project) {
  if (!project) {
    return false;
  }
  var updated = false;
  var USER_SECRETS_NUGET_PACKAGE_KEY = 'dependencies:Microsoft.Extensions.Configuration.UserSecrets';
  var USER_SECRETS_NUGET_VERSION = '1.0.0-rc1-final';
  // do not update existing userSecretsId keys!
  var currentUserSecretsDependency = project.get(USER_SECRETS_NUGET_PACKAGE_KEY);
  if (currentUserSecretsDependency) {
    this.log('Existing %s found with value: %s', USER_SECRETS_NUGET_PACKAGE_KEY, green(currentUserSecretsDependency));
    this.log('Adding %s key: %s', USER_SECRETS_NUGET_PACKAGE_KEY, yellow("skipped"));
  } else {
    updated = project.set(USER_SECRETS_NUGET_PACKAGE_KEY, USER_SECRETS_NUGET_VERSION);
    if (updated === false) {
      this.log('Adding %s: %s %s', USER_SECRETS_NUGET_PACKAGE_KEY, USER_SECRETS_NUGET_VERSION, red("failure"));
    } else {
      this.log('Adding %s: %s %s', USER_SECRETS_NUGET_PACKAGE_KEY, USER_SECRETS_NUGET_VERSION, green("success"));
    }
  }
  return updated;
};
