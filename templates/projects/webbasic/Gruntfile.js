/*
  This file is the main entry point for defining grunt tasks and using grunt plugins.
  Click here to learn more: https://docs.asp.net/en/latest/client-side/using-grunt.html
*/
"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: "wwwroot/lib",
          layout: "byComponent",
          cleanTargetDir: false,
          copy: false
        }
      }
    }
  });

  // This command registers the default task which will install bower packages into wwwroot/lib
  grunt.registerTask("default", ["bower:install"]);

  // The following line loads the grunt plugins.
  // This line needs to be at the end of this this file.
  grunt.loadNpmTasks("grunt-bower-task");
};
