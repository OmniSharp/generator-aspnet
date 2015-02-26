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

          it('wwwroot/css directory created', function () {
              assert.file('webTest/wwwroot/css');
          });

          it('wwwroot/images directory created', function () {
              assert.file('webTest/wwwroot/images');
          });

          it('wwwroot/lib directory created', function () {
              assert.file('webTest/wwwroot/lib');
          });

          it('Controllers directory created', function () {
              assert.file('webTest/Controllers');
          });

          it('Migrations directory created', function () {
              assert.file('webTest/Migrations');
          });

          it('Models directory created', function () {
              assert.file('webTest/Models');
          });

          it('Views directory created', function () {
              assert.file('webTest/Views');
          });

          it('Views/Account directory created', function () {
              assert.file('webTest/Views/Account');
          });

          it('Views/Home directory created', function () {
              assert.file('webTest/Views/Home');
          });

          it('Views/Shared directory created', function () {
              assert.file('webTest/Views/Shared');
          });
      });


      var files = [
          'webTest/bower.json',
          'webTest/config.json',
          'webTest/gruntfile.js',
          'webTest/package.json',
          'webTest/project.json',
          'webTest/Startup.cs',
          'webTest/Compiler/Preprocess/RazorPreCompilation.cs',
          'webTest/Controllers/AccountController.cs',
          'webTest/Controllers/HomeController.cs',
          'webTest/Models/AccountViewModels.cs',
          'webTest/Models/IdentityModels.cs',
          'webTest/Views/Account/_ChangePasswordPartial.cshtml',
          'webTest/Views/Account/Login.cshtml',
          'webTest/Views/Account/Manage.cshtml',
          'webTest/Views/Account/Register.cshtml',
          'webTest/Views/Home/Index.cshtml',
          'webTest/Views/Home/About.cshtml',
          'webTest/Views/Home/Contact.cshtml',
          'webTest/Views/Shared/Error.cshtml',
          'webTest/Views/Shared/_Layout.cshtml',
          'webTest/Views/Shared/_LoginPartial.cshtml',
          'webTest/Migrations/000000000000000_CreateIdentitySchema.cs',
          'webTest/Migrations/ApplicationDbContextModelSnapshot.cs'
        ];
      describe('Checking files', function () {
          for (i = 0; i < files.length; i++) {
              util.filesCheck(files[i]);
          }
      });

  });

  /*
   * yo aspnet Web API Application
   */
  describe('aspnet - Web API Application', function () {

      util.goCreateApplication('webapi', 'webAPITest');

      describe('Checking directories', function () {
          it('Application directory created', function () {
              assert.file('webAPITest/');
          });

          it('Controllers directory created', function () {
              assert.file('webAPITest/Controllers');
          });

          it('Views directory created', function () {
              assert.file('webAPITest/Views');
          });

          it('Views/Home directory created', function () {
              assert.file('webAPITest/Views/Home');
          });
      });


      var files = ['webAPITest/project.json', 'webAPITest/Startup.cs', 'webAPITest/Views/Home/Index.cshtml', 'webAPITest/Controllers/HomeController.cs', 'webAPITest/Controllers/ValuesController.cs'];
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