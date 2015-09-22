var findup = require('findup-sync');
var path = require('path');
var _ = require('lodash');

var storageInstance, projectJsonPath, globalJsonPath, configPath;
module.exports = {
  getStorage: function(fs, projectPath) {
    "use strict";
    configPath = findup('.aspnet-yo.json');

    if (!configPath) {
      configPath = module.exports.getGlobalJsonPath();
      if (!configPath) {
        configPath = module.exports.getProjectJsonPath();
      }

      if (configPath) {
        configPath = path.join(path.dirname(configPath), '.aspnet-yo.json');
      } else {
        configPath = path.join(projectPath, '.aspnet-yo.json');
      }
    }

    if (!storageInstance) {
      projectPath = (module.exports.getProjectJsonPath() && path.resolve(path.dirname(module.exports.getProjectJsonPath())) || projectPath);
      var defaultNamespace = path.basename(projectPath);

      if (!projectPath) {
        return null;
      }

      storageInstance = new Storage(defaultNamespace, fs, configPath);

      if (!storageInstance.get('namespace')) {
        storageInstance.set('namespace', defaultNamespace);
        storageInstance.save();
      }
    }

    return storageInstance;
  },
  getProjectJsonPath: function() {
    "use strict";

    if (!projectJsonPath) {
      projectJsonPath = findup('project.json');
    }
    return projectJsonPath;
  },
  getProjectJson: function(fs) {
    "use strict";

    var path = module.exports.getProjectJsonPath();
    if (!path) {
      return {};
    }

    return fs.readJSON(path, {});
  },
  getGlobalJsonPath: function() {
    "use strict";

    if (!globalJsonPath) {
      globalJsonPath = findup('global.json');
    }
    return globalJsonPath;
  },
  getGlobalJson: function(fs) {
    "use strict";

    var path = module.exports.getGlobalJsonPath(path);
    if (!path) {
      return {};
    }

    return fs.readJSON(path, {});
  },
};

/**
 * Storage instances handle a json file where Generator authors can store data.
 *
 * `Base` instantiate the storage as `config` by default.
 *
 * @constructor
 * @param {String} name       The name of the new storage (this is a namespace)
 * @param {mem-fs-editor} fs  A mem-fs editor instance
 * @param {String} configPath The filepath used as a storage.
 *
 * @example
 * var MyGenerator = yeoman.generators.base.extend({
 *   config: function() {
 *     this.config.set('coffeescript', false);
 *   }
 * });
 */

var Storage = function Storage(name, fs, configPath) {
  "use strict";
  this.path = configPath;
  this.name = name;
  this.fs = fs;
  this.existed = Object.keys(this._store()).length > 0;
};

/**
 * Return the current store as JSON object
 * @private
 * @return {Object} the store content
 */
Storage.prototype._store = function() {
  "use strict";
  return this.fs.readJSON(this.path, {})[this.name] || {};
};

/**
 * Persist a configuration to disk
 * @param {Object} val - current configuration values
 */
Storage.prototype._persist = function(val) {
  "use strict";
  var fullStore = this.fs.readJSON(this.path, {});
  fullStore[this.name] = val;
  this.fs.write(this.path, JSON.stringify(fullStore, null, '  '));
};

/**
 * Save a new object of values
 * @param {Object} val - Store new state
 * @return {null}
 */

Storage.prototype.save = function() {
  "use strict";
  this._persist(this._store());
};

/**
 * Get a stored value
 * @param  {String} key  The key under which the value is stored.
 * @return {*}           The stored value. Any JSON valid type could be returned
 */

Storage.prototype.get = function(key) {
  "use strict";
  return this._store()[key];
};

/**
 * Assign a key to a value and schedule a save.
 * @param {String} key  The key under which the value is stored
 * @param {*} val  Any valid JSON type value (String, Number, Array, Object).
 * @return {*} val  Whatever was passed in as val.
 */

Storage.prototype.set = function(key, val) {
  "use strict";
  var store = this._store();

  if (_.isObject(key)) {
    val = _.extend(store, key);
  } else {
    store[key] = val;
  }

  this._persist(store);
  return val;
};

/**
 * Delete a key from the store and schedule a save.
 * @param  {String} key  The key under which the value is stored.
 * @return {null}
 */

Storage.prototype.delete = function(key) {
  "use strict";
  var store = this._store();
  delete store[key];
  this._persist(store);
};
