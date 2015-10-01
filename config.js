var findup = require('findup-sync');
var path = require('path');
//  var _ = require('lodash');

var projectJsonPath, globalJsonPath;
var abstractionsStr = '.Abstractions';

function getBaseNamespace(fs) {
  "use strict";

  var projectJsonPath = module.exports.getProjectJsonPath();

  if (!projectJsonPath) {
    return '';
  }

  var projectJson = require(projectJsonPath);
  if (projectJson && projectJson.tooling && projectJson.tooling.defaultnamespace) {
    return projectJson.tooling.defaultnamespace;
  }

  var projectPath = path.resolve(path.dirname(projectJsonPath));
  var namespace = path.basename(projectPath);
  // If it ends in .Abstractions, we want the common namespace by default.
  if (namespace.indexOf(abstractionsStr) === namespace.length - abstractionsStr.length) {
    namespace = namespace.substr(0, namespace.length - abstractionsStr.length);
  }
  return namespace;
}

module.exports = {
  // Get the namespace relative to the cwd
  getNamespace: function(fs) {
    "use strict";

    var baseNamespace = getBaseNamespace(fs);
    var cwd = process.cwd();
    var baseDirectory = path.resolve(path.dirname(projectJsonPath));
    var relativePath = path.relative(baseDirectory, cwd);
    if (relativePath) {
      return [baseNamespace].concat(relativePath.split(path.sep)).join('.');
    }

    return baseNamespace;
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
