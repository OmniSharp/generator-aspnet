var util = (function () {

    var yeoman = require('yeoman-generator');
    var path = require('path');
    var assert;
    var mockGen;

    function goCreate(subgenerator) {
        before(function (done) {

            assert = yeoman.assert;
            mockGen = yeoman.test;

            mockGen.run(path.join(__dirname, '../' + subgenerator))
                .inDir(path.join(__dirname, './.tmp'))
                .on('end', done);
        });
    };

    function goCreateWithArgs(subgenerator, args) {
        before(function (done) {
            assert = yeoman.assert;
            mockGen = yeoman.test;

            mockGen.run(path.join(__dirname, '../' + subgenerator))
                .inDir(path.join(__dirname, './.tmp'))
                .withArguments(args)
                .on('end', done);
        });
    };

    function goCreateApplication(type, applicationName) {
        before(function (done) {

            assert = yeoman.assert;
            mockGen = yeoman.test;

            var mockPrompt = {
                type: type,
                applicationName: applicationName
            };

            mockGen.run(path.join(__dirname, '../app'))

            .inDir(path.join(__dirname, './.tmp'))
                .withPrompt(mockPrompt)
                .on('end', done);
        });

    };

    function dirsCheck(dirs) {
        describe('Directories Creation', function () {

            for (i = 0; i < dirs.length; i++) {
                it(dirs[i] + ' created.', function () {
                    assert.file(dirs[i]);
                });
            }

        });

    };

    function filesCheck(file) {


        it(file + ' created.', function () {
            assert.file(file);
        });

    };

    function dirCheck(message, dir) {
        describe('Directory Creation', function () {
            it(message, function () {
                assert.file(dir);
            });
        });
    };

    function fileCheck(message, file) {
        describe('File Creation', function () {
            it(message, function () {
                assert.file(file);
            });
        });
    };

    function fileContentCheck(file, message, content) {
        it(message, function () {
            assert.fileContent(file, content);
        });
    };


    var methods = {
        goCreateApplication: goCreateApplication,
        goCreate: goCreate,
        goCreateWithArgs: goCreateWithArgs,
        fileCheck: fileCheck,
        filesCheck: filesCheck,
        dirCheck: dirCheck,
        dirsCheck: dirsCheck,
        fileContentCheck: fileContentCheck
    }

    return methods;
})();

module.exports = util;