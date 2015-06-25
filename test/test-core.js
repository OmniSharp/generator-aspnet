'use strict';
var yeoman = require('yeoman-generator');
var assert = yeoman.assert;
var util = require('./test-utility');

/*
 * can be imported
 */
describe('aspnet 5 generator', function() {
  it('can be imported', function() {
    var app = require('../app');
    yeoman.assert.notEqual(app, undefined);
  })
})


/*
 * yo aspnet Empty Application
 */
describe('aspnet - Empty Application', function() {

  util.goCreateApplication('empty', 'emptyTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('emptyTest/');
    });

    it('wwwroot directory created', function() {
      assert.file('emptyTest/wwwroot');
    });

  });

  var files = [
    'emptyTest/hosting.ini',
    'emptyTest/project.json',
    'emptyTest/Startup.cs',
    'emptyTest/wwwroot/README.md'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});

/*
 * yo aspnet Class Library
 */
describe('aspnet - Class Library', function() {

  util.goCreateApplication('classlib', 'classTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('classTest/');
    });
  });

  var files = ['classTest/project.json', 'classTest/Class1.cs', 'classTest/.gitignore'];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});


/*
 * yo aspnet Console Application
 */
describe('aspnet - Console Application', function() {

  util.goCreateApplication('console', 'consoleTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('consoleTest/');
    });
  });

  var files = [
    'consoleTest/.gitignore',
    'consoleTest/Program.cs',
    'consoleTest/project.json'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});

/*
 * yo aspnet Unit Test Application
 */
describe('aspnet - Unit Test Application', function() {

  util.goCreateApplication('unittest', 'unittestTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('unittestTest/');
    });
  });

  var files = ['unittestTest/project.json', 'unittestTest/SampleTest.cs'];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});

/*
 * yo aspnet Web Application - Grunt option
 */
describe('aspnet - Web Application w/grunt', function() {

  util.goCreateApplicationWithOptions('web', 'gruntTest', {
    grunt: 'grunt'
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gruntTest/');
    });

    it('grunt file created', function() {
      assert.file('gruntTest/gruntfile.js');
    });

    it('gulpfile does NOT exist', function() {
      assert.noFile('gruntTest/gulpfile.js');
    });
  });
});

/*
 * yo aspnet Web Application - No Grunt option
 */
describe('aspnet - Web Application w/o grunt', function() {

  util.goCreateApplication('web', 'gulpTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gulpTest/');
    });

    it('gulp file created', function() {
      assert.file('gulpTest/gulpfile.js');
    });

    it('grunt file does NOT exist', function() {
      assert.noFile('gulpTest/gruntfile.js');
    });
  });
});

/*
 * yo aspnet Web Application
 */
describe('aspnet - Web Application', function() {

  util.goCreateApplication('web', 'webTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webTest/');
    });

    it('Controllers directory created', function() {
      assert.file('webTest/Controllers');
    });

    it('Migrations directory created', function() {
      assert.file('webTest/Migrations');
    });


    it('Models directory created', function() {
      assert.file('webTest/Models');
    });

    it('Services directory created', function() {
      assert.file('webTest/Services');
    });

    it('Views directory created', function() {
      assert.file('webTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('webTest/Views/Home');
    });

    it('Views/Manage directory created', function() {
      assert.file('webTest/Views/Manage');
    });

    it('Views/Shared directory created', function() {
      assert.file('webTest/Views/Shared');
    });

    it('wwwroot directory created', function() {
      assert.file('webTest/wwwroot');
    });

    it('wwwroot/css directory created', function() {
      assert.file('webTest/wwwroot/css');
    });

    it('wwwroot/images directory created', function() {
      assert.file('webTest/wwwroot/images');
    });

    it('wwwroot/js directory created', function() {
      assert.file('webTest/wwwroot/js');
    });

  });


  var files = [
    'webTest/.bowerrc',
    'webTest/.gitignore',
    'webTest/bower.json',
    'webTest/config.json',
    'webTest/gulpfile.js',
    'webTest/hosting.ini',
    'webTest/package.json',
    'webTest/project.json',
    'webTest/README.md',
    'webTest/Startup.cs',
    "webTest/Controllers/AccountController.cs",
    "webTest/Controllers/HomeController.cs",
    "webTest/Controllers/ManageController.cs",
    'webTest/Migrations/00000000000000_CreateIdentitySchema.cs',
    'webTest/Migrations/00000000000000_CreateIdentitySchema.Designer.cs',
    'webTest/Migrations/ApplicationDbContextModelSnapshot.cs',
    'webTest/Models/AccountViewModels.cs',
    'webTest/Models/IdentityModels.cs',
    'webTest/Models/ManageViewModels.cs',
    'webTest/Services/MessageServices.cs',
    'webTest/Views/Account/ConfirmEmail.cshtml',
    'webTest/Views/Account/ExternalLoginConfirmation.cshtml',
    'webTest/Views/Account/ExternalLoginFailure.cshtml',
    'webTest/Views/Account/ForgotPassword.cshtml',
    'webTest/Views/Account/ForgotPasswordConfirmation.cshtml',
    'webTest/Views/Account/Lockout.cshtml',
    'webTest/Views/Account/Login.cshtml',
    'webTest/Views/Account/Register.cshtml',
    'webTest/Views/Account/ResetPassword.cshtml',
    'webTest/Views/Account/ResetPasswordConfirmation.cshtml',
    'webTest/Views/Account/SendCode.cshtml',
    'webTest/Views/Account/VerifyCode.cshtml',
    'webTest/Views/Home/About.cshtml',
    'webTest/Views/Home/Contact.cshtml',
    'webTest/Views/Home/Index.cshtml',
    'webTest/Views/Manage/AddPhoneNumber.cshtml',
    'webTest/Views/Manage/ChangePassword.cshtml',
    'webTest/Views/Manage/Index.cshtml',
    'webTest/Views/Manage/ManageLogins.cshtml',
    'webTest/Views/Manage/RemoveLogin.cshtml',
    'webTest/Views/Manage/SetPassword.cshtml',
    'webTest/Views/Manage/VerifyPhoneNumber.cshtml',
    'webTest/Views/Shared/Error.cshtml',
    'webTest/Views/Shared/_Layout.cshtml',
    'webTest/Views/Shared/_LoginPartial.cshtml',
    'webTest/Views/Shared/_ValidationScriptsPartial.cshtml',
    'webTest/Views/_ViewImports.cshtml',
    'webTest/Views/_ViewStart.cshtml',
    'webTest/wwwroot/css/site.css',
    'webTest/wwwroot/favicon.ico',
    'webTest/wwwroot/images/ASP-NET-Banners-01.png',
    'webTest/wwwroot/images/ASP-NET-Banners-02.png',
    'webTest/wwwroot/images/Banner-01-Azure.png',
    'webTest/wwwroot/images/Banner-02-VS.png',
    'webTest/wwwroot/js/site.js'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});

/*
 * yo aspnet Web API Application
 */
describe('aspnet - Web API Application', function() {

  util.goCreateApplication('webapi', 'webAPITest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webAPITest/');
    });

    it('Controllers directory created', function() {
      assert.file('webAPITest/Controllers');
    });

    it('Properties directory created', function() {
      assert.file('webAPITest/Properties');
    });

    it('wwwroot directory created', function() {
      assert.file('webAPITest/wwwroot');
    });
  });


  var files = [
    'webAPITest/Controllers/ValuesController.cs',
    'webAPITest/hosting.ini',
    'webAPITest/project.json',
    'webAPITest/Properties/launchSettings.json',
    'webAPITest/Startup.cs',
    'webAPITest/wwwroot/README.md'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});


/*
 * yo aspnet Nancy Application
 */
describe('aspnet - Nancy Application', function() {

  util.goCreateApplication('nancy', 'nancyTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('nancyTest/');
    });
  });


  var files = ['nancyTest/project.json', 'nancyTest/Startup.cs', 'nancyTest/HomeModule.cs'];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});
