/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('aspnet-f5 generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('aspnet-f5:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    //it('creates expected files', function (done) {
    //    var expected = [
    //        // add files you expect to exist here.
    //        '.jshintrc',
    //        '.editorconfig'
    //    ];

    //    //helpers.mockPrompt(this.app, {
    //    //    'Empty Application': true
    //    //});
    //    //this.app.options['skip-install'] = true;
    //    this.app.run({}, function () {
    //        helpers.assertFiles(expected);
    //        done();
    //    });
    //});
});
