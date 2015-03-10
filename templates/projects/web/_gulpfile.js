var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var project = require('./project.json');
var lib = project.webroot + '/lib';

gulp.task('default', ['bower:install'], function () {
    return;
});

gulp.task('bower:install', ['clean'], function () {
    return bower({
        directory: lib
    });
});

gulp.task('clean', function (done) {
    del(lib, done);
});