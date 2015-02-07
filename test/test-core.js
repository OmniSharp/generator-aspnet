  var yeoman = require('yeoman-generator');
  var path = require('path');
  var mockGen;
  var assert = yeoman.assert;
  var util = require('./test-utility');

  /*
   * can be imported
   */
  describe('aspnet 5 generator', function () {
      it('can be imported', function () {
          var app = require('../app');
          yeoman.assert.notEqual(app, undefined);
      })
  })


  /*
   * yo aspnet Empty Application
   */
  describe('aspnet - Empty Application', function () {

      util.goCreateApplication('empty', 'emptyTest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('emptyTest/');
          });
      });

      var files = ['emptyTest/project.json', 'emptyTest/Startup.cs'];
      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });


  });

  /*
   * yo aspnet Class Library
   */
  describe('aspnet - Class Library', function () {

      util.goCreateApplication('classlib', 'classTest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('classTest/');
          });
      });

      var files = ['classTest/project.json', 'classTest/Class1.cs'];
      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });

  });


  /*
   * yo aspnet Console Application
   */
  describe('aspnet - Console Application', function () {

      util.goCreateApplication('console', 'consoleTest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('consoleTest/');
          });
      });

      var files = ['consoleTest/project.json', 'consoleTest/Program.cs'];
      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });

  });

  /*
   * yo aspnet Unit Test Application
   */
  describe('aspnet - Unit Test Application', function () {

      util.goCreateApplication('unittest', 'unittestTest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('unittestTest/');
          });
      });

      var files = ['unittestTest/project.json', 'unittestTest/SampleTest.cs'];
      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });

  });

  /*
   * yo aspnet Web Application
   */
  describe('aspnet - Web Application', function () {

      util.goCreateApplication('web', 'webTest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('webTest/');
          });

          it('wwwroot directory created', function () {
              assert.file('webTest/wwwroot');
          });
      });


      var files = ['webtest/project.json', 'webtest/Startup.cs'];
      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });

  });

  /*
   * yo aspnet Nancy Application
   */
  describe('aspnet - Nancy Application', function () {

      util.goCreateApplication('nancy', 'nancyTest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('nancyTest/');
          });
      });


      var files = ['nancyTest/project.json', 'nancyTest/Startup.cs', 'nancyTest/HomeModule.cs'];
      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });

  });

  /*
   * yo aspnet MVC Application
   */
  describe('aspnet - MVC Application', function () {

      util.goCreateApplication('mvc', 'mvcTest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('mvcTest/');
          });

          it('Controllers directory created', function () {
              assert.file('mvcTest/Controllers');
          });

          it('Models directory created', function () {
              assert.file('mvcTest/Models');
          });

          it('Views directory created', function () {
              assert.file('mvcTest/Views');
              assert.file('mvcTest/Views/Home');
              assert.file('mvcTest/Views/Shared');
          });

          it('wwwroot directory created', function () {
              assert.file('mvcTest/wwwroot');
          });
      });


      var files = [
                    'mvcTest/project.json',
                    'mvcTest/Startup.cs',
                    'mvcTest/Controllers/HomeController.cs',
                    'mvcTest/Models/User.cs',
                    'mvcTest/Views/Home/Index.cshtml',
                    'mvcTest/Views/Shared/_Layout.cshtml'
                  ];


      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });

  });