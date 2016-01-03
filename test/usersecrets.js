'use strict';

var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var mkdirp = require('mkdirp');
var nconf = require('nconf');
var path = require('path');
var util = require('./test-utility');
var yeoman = require('yeoman-generator');

/**
 * Sets of tests to validate aspnet:UserSecrets generator
 * Below tests are created in separate file because of problem
 * with testing nested generators invocations with existing helpers from
 * util package (test-utility.js). See comments in implementation below
 * @todo use assert.JSONFileContent() from updated yeoman-generator
 */
describe('aspnet:UserSecrets', function() {

  var USER_SECRETS_ID_KEY = 'userSecretsId';
  var USER_SECRETS_NUGET_PACKAGE_KEY = 'dependencies:Microsoft.Extensions.Configuration.UserSecrets';

  /**
   * Slightly modified version of runtime Yo testDirectory
   * features - this one make sure that directory is created
   * which is missing in original swap trick
   * @credit @david-driscoll
   * @see ./test-utility.js
   */
  var oldTestDirectory;
  after(function() {
    helpers.testDirectory = oldTestDirectory;
  });
  before(function() {
    oldTestDirectory = helpers.testDirectory;
    yeoman.test.testDirectory = function(dir, cb) {
      dir = path.resolve(dir);
      mkdirp.sync(dir);
      process.chdir(dir);
      cb();
    };
  });

  /**
   * We are in directory witout ASP.NET5 project.json
   * We don't want to create any artefacts after running UserSecrets
   * that is: make sure we don't create project.json
   */
  describe('It does not create any file artefacts when called in directory without project.json', function() {
    before(function(done) {
      var tempDir = util.makeTempDir();
      helpers.run(require.resolve('../UserSecrets'))
        .inDir(tempDir)
        .on('end', function() {
          done();
        });
    });

    it('there is no project.json created in current directory', function() {
      assert.noFile('project.json');
    });

  });

  /**
   * When we are in directory with ASP.NET5 project.json
   * make sure we are not overriding existing keys - as with web template
   * which already comes with UserSecrets implementation.
   * That is: don't mess with existing project.json
   */
  describe('It does not override existing keys in project.json', function() {
    var existingUserSecretId = null,
      existingPackageVersion = null;
    before(function(done) {
      var tempDir = util.makeTempDir();
      helpers.run(require.resolve('../app'))
        .withPrompts({
          type: 'web',
          applicationName: 'webTest'
        })
        .inDir(tempDir)
        .on('end', function() {
          var targetDir = path.join(tempDir, 'webTest/');
          process.chdir(targetDir);
          nconf.remove('file');
          nconf.file({
            file: './project.json'
          });
          // store existing values
          existingUserSecretId = nconf.get(USER_SECRETS_ID_KEY);
          existingPackageVersion = nconf.get(USER_SECRETS_NUGET_PACKAGE_KEY);
          assert.ok(existingUserSecretId, 'userSecretId is not null');
          assert.ok(existingPackageVersion, 'packageVersion is not null');
          helpers.run(require.resolve('../UserSecrets'))
            .inDir(targetDir)
            .on('end', function() {
              // reset project reprentation
              nconf.remove('file');
              nconf.file({
                file: './project.json'
              });
              done();
            });
        });
    });

    it('There is a project.json file already created', function() {
      assert.file('project.json');
    });

    it('The userSecretId key is not overriden', function() {
      assert.equal(existingUserSecretId, nconf.get(USER_SECRETS_ID_KEY));
    });

    it('the UserSecrets nuget package version is not changed', function() {
      assert.equal(existingPackageVersion, nconf.get(USER_SECRETS_NUGET_PACKAGE_KEY));
    });

  });

  /**
   * When we are in directory with existing ASP.NET5 project and there is
   * no UserSupport added to project make sure that required keys are added
   * and values are at least formatted as expected or have correct values
   */
  describe('It creates expected keys in project.json', function() {
    var existingUserSecretId = null,
      existingPackageVersion = null;
    before(function(done) {
      var tempDir = util.makeTempDir();
      helpers.run(require.resolve('../app'))
        .withPrompts({
          type: 'empty',
          applicationName: 'emptyTest'
        })
        .inDir(tempDir)
        .on('end', function() {
          var targetDir = path.join(tempDir, 'emptyTest/');
          process.chdir(targetDir);
          nconf.remove('file');
          nconf.file({
            file: './project.json'
          });
          // store existing values - expected to be falsy
          existingUserSecretId = nconf.get(USER_SECRETS_ID_KEY);
          existingPackageVersion = nconf.get(USER_SECRETS_NUGET_PACKAGE_KEY);
          assert.equal(undefined, existingUserSecretId, 'userSecretId is null');
          assert.equal(undefined, existingPackageVersion, 'packageVersion is null');
          helpers.run(require.resolve('../UserSecrets'))
            .inDir(targetDir)
            .on('end', function() {
              // reset project reprentation
              nconf.remove('file');
              nconf.file({
                file: './project.json'
              });
              done();
            });
        });
    });

    it('There is a project.json file already created', function() {
      assert.file('project.json');
    });

    it('The userSecretId key is added', function() {
      assert.ok(nconf.get(USER_SECRETS_ID_KEY));
    });

    it('The correctly formatted userSecretId value is added', function() {
      assert.fileContent('./project.json', /aspnet5-emptyTest/);
    });

    it('the UserSecrets nuget package version is added', function() {
      assert.fileContent('./project.json', /Microsoft\.Extensions\.Configuration\.UserSecrets/);
      assert.fileContent('./project.json', /1\.0\.0-rc1-final/);
    });

  });

});
