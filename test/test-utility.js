'use strict';
var util = (function() {

  var yeoman = require('yeoman-generator');
  var path = require('path');
  var os = require('os');
  var crypto = require('crypto');
  var _ = require('lodash');
  var assert;
  var mockGen;

  function makeTempDir() {
    return path.join(os.tmpdir(), crypto.randomBytes(20).toString('hex'));
  }

  function goCreate(subgenerator, tempDir) {
    var testDirectory;
    if (tempDir) {
      // Don't clear the test directory, we need it to have previous contents.
      before(function() {
        testDirectory = yeoman.test.testDirectory;
        yeoman.test.testDirectory = function(dir, cb) {
          process.chdir(dir);
          cb();
        };
      });
      after(function() {
        yeoman.test.testDirectory = testDirectory;
      });
    }
    before(function(done) {

      assert = yeoman.assert;
      mockGen = yeoman.test;

      var ctx = mockGen.run(path.join(__dirname, '../' + subgenerator));

      if (tempDir) {
        ctx.inDir(tempDir);
      }

      ctx.on('end', done);
    });
  }

  function goCreateWithArgs(subgenerator, args, tempDir) {
    var testDirectory;
    if (tempDir) {
      // Don't clear the test directory, we need it to have previous contents.
      before(function() {
        testDirectory = yeoman.test.testDirectory;
        yeoman.test.testDirectory = function(dir, cb) {
          process.chdir(dir);
          cb();
        };
      });
      after(function() {
        yeoman.test.testDirectory = testDirectory;
      });
    }
    before(function(done) {
      assert = yeoman.assert;
      mockGen = yeoman.test;

      var ctx = mockGen.run(path.join(__dirname, '../' + subgenerator))
        .withArguments(args);

      if (tempDir) {
        ctx.inDir(tempDir);
      }

      ctx.on('end', done);
    });
  }

  function goCreateApplication(type, applicationName, tempDir, prompts) {
    before(function(done) {

      assert = yeoman.assert;
      mockGen = yeoman.test;

      var mockPrompt = {
        type: type,
        applicationName: applicationName
      };

      mockPrompt = _.defaults(mockPrompt, prompts || {}, { projectStructure: false });

      var ctx = mockGen.run(path.join(__dirname, '../app'))
        .withPrompts(mockPrompt);

      if (tempDir) {
        ctx.inDir(tempDir);
      }

      ctx.on('end', done);
    });

    // Force the test to take on the solution directory
    if (prompts && prompts.projectStructure) {
      moveToSolutionDirectory();
    }
  }

  function goCreateApplicationWithOptions(type, applicationName, options, prompts) {
    before(function(done) {

      assert = yeoman.assert;
      mockGen = yeoman.test;

      var mockPrompt = {
        type: type,
        applicationName: applicationName
      };

      mockPrompt = _.defaults(mockPrompt, prompts || {}, { projectStructure: false });

      mockGen.run(path.join(__dirname, '../app'))
        .withOptions(options)
        .withPrompts(mockPrompt)
        .on('end', done);
    });

    // Force the test to take on the solution directory
    if (prompts && prompts.projectStructure) {
      moveToSolutionDirectory();
    }
  }

  function goCreateApplicationWithPrompts(type, applicationName, prompts) {
    before(function(done) {

      assert = yeoman.assert;
      mockGen = yeoman.test;

      var mockPrompt = {
        type: type,
        applicationName: applicationName
      };

      mockPrompt = _.defaults(mockPrompt, prompts || {}, { projectStructure: false });

      mockGen.run(path.join(__dirname, '../app'))
        .withPrompts(mockPrompt)
        .on('end', done);
    });

    // Force the test to take on the solution directory
    if (prompts && prompts.projectStructure) {
      moveToSolutionDirectory();
    }
  }

  function dirsCheck(dirs) {
    describe('Directories Creation', function() {
      for (var i = 0; i < dirs.length; i++) {
        /*jshint loopfunc: true */
        it(dirs[i] + ' created.', function() {
          assert.file(dirs[i]);
        });
      }
    });
  }

  function filesCheck(file) {
    it(file + ' created.', function() {
      assert.file(file);
    });
  }

  function dirCheck(message, dir) {
    describe('Directory Creation', function() {
      it(message, function() {
        assert.file(dir);
      });
    });
  }

  function fileCheck(message, file) {
    describe('File Creation', function() {
      it(message, function() {
        assert.file(file);
      });
    });
  }

  function fileContentCheck(file, message, content) {
    it(message, function() {
      assert.fileContent(file, content);
    });
  }

  function moveToSolutionDirectory(callback) {
    var directory;
    before(function() {
      directory = process.cwd();
      process.chdir(path.resolve(directory, '..'));
    });
    after(function() {
      process.chdir(directory);
    });
  }


  var methods = {
    goCreateApplication: goCreateApplication,
    goCreateApplicationWithOptions: goCreateApplicationWithOptions,
    goCreateApplicationWithPrompts: goCreateApplicationWithPrompts,
    goCreate: goCreate,
    goCreateWithArgs: goCreateWithArgs,
    fileCheck: fileCheck,
    filesCheck: filesCheck,
    dirCheck: dirCheck,
    dirsCheck: dirsCheck,
    fileContentCheck: fileContentCheck,
    makeTempDir: makeTempDir,
    moveToSolutionDirectory: moveToSolutionDirectory
  };

  return methods;
})();

module.exports = util;
