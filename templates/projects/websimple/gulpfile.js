/// <binding Clean='clean' />
'use strict';
var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  bowerFiles  = require("main-bower-files"),
  bowerNormalize = require("gulp-bower-normalize"),
  rename = require("gulp-rename"),
  runSequence = require("run-sequence"),
  project = require("./project.json");

var sources = {
  js: ["Scripts/**/*.js"],
  css: ["Stylesheets/**/*.css"],
  images: ["Images/**/*", "!Images/favicon.ico"],
  favicon: ["Images/favicon.ico"]
};

var webroot = "./" + project.webroot + "/";
var dests = {
  js: webroot + "js",
  css: webroot + "css",
  images: webroot + "images",
  favicon: webroot,
  lib: webroot + "lib"
};

gulp.task('bower', function() {
  return gulp.src(bowerFiles(), {base: './bower_components'})
      .pipe(bowerNormalize({flatten: true}))
      .pipe(gulp.dest(dests.lib));
});

gulp.task("clean:js", function(cb) {
  rimraf(dests.js, cb);
});

gulp.task("clean:css", function(cb) {
  rimraf(dests.css, cb);
});

gulp.task("clean:favicon", function(cb) {
  rimraf(dests.favicon + "/favicon.ico", cb);
});

gulp.task("clean:images", function(cb) {
  rimraf(dests.images, cb);
});

gulp.task("clean:lib", function(cb) {
  rimraf(dests.lib, cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:images", "clean:favicon", "clean:lib"]);

gulp.task("copy:js", function() {
  return gulp.src(sources.js)
    .pipe(gulp.dest(dests.js));
});

gulp.task("copy:css", function() {
  return gulp.src(sources.css)
    .pipe(gulp.dest(dests.css));
});

gulp.task("copy:images", function() {
  return gulp.src(sources.images)
    .pipe(gulp.dest(dests.images));
});

gulp.task("copy:favicon", function() {
  return gulp.src(sources.favicon)
    .pipe(gulp.dest(dests.favicon));
});

gulp.task("min:js", function() {
  return gulp.src(sources.js)
    .pipe(concat("site.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(dests.js));
});

gulp.task("min:libjs", ["bower"], function() {
  return gulp.src([dests.lib + "/js/**/*.js", "!" + dests.lib + "/js/**/*.min.js"])
    .pipe(uglify())
    .pipe(rename(function(path) { path.basename += ".min"; }))
    .pipe(gulp.dest(dests.lib + "/js"));
});

gulp.task("min:css", function() {
  return gulp.src(sources.css)
    .pipe(concat("site.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest(dests.css));
});

gulp.task("min:libcss", ["bower"], function() {
  return gulp.src([dests.lib + "/css/**/*.css", "!" + dests.lib + "/css/**/*.min.css"])
    .pipe(cssmin())
    .pipe(rename(function(path) { path.basename += ".min"; }))
    .pipe(gulp.dest(dests.lib + "/css"));
});

gulp.task("min", ["min:js", "min:css", "copy:favicon", "copy:images", "min:libjs", "min:libcss"]);

gulp.task("copy", ["copy:js", "copy:css", "copy:images", "copy:favicon"]);

gulp.task("publish", function(callback) {
  runSequence(
    "clean",
    ["min", "bower"],
    callback
  )
});

gulp.task("default", function(callback) {
  runSequence(
    "clean",
    ["copy", "bower"],
    callback
  )
});

gulp.task('watch', ['default'], function() {
    gulp.watch(sources.js, ['copy:js']);
    gulp.watch(sources.css, ['copy:css']);
    gulp.watch(sources.images, ['copy:images']);
    gulp.watch(sources.favicon, ['copy:favicon']);
    gulp.watch(['bower.json'], ['bower']);
});
