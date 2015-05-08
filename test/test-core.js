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
  });

  var files = ['emptyTest/project.json', 'emptyTest/Startup.cs'];
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

  var files = ['consoleTest/project.json', 'consoleTest/Program.cs', 'consoleTest/.gitignore'];
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
 * yo aspnet Web Application - Gulp option
 */
describe('aspnet - Web Application w/gulp', function() {

  util.goCreateApplicationWithOptions('web', 'gulpTest', {
    gulp: 'gulp'
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gulpTest/');
    });

    it('gulp file created', function() {
      assert.file('gulpTest/gulpfile.js');
    });

    it('gruntfile does NOT exist', function() {
      assert.noFile('gulpTest/gruntFile.js');
    });
  });
});

/*
 * yo aspnet Web Application - No Gulp option
 */
describe('aspnet - Web Application w/o gulp', function() {

  util.goCreateApplication('web', 'gruntTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gruntTest/');
    });

    it('grunt file created', function() {
      assert.file('gruntTest/gruntfile.js');
    });

    it('gulp file does NOT exist', function() {
      assert.noFile('gruntTest/gulpFile.js');
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

    it('wwwroot directory created', function() {
      assert.file('webTest/wwwroot');
    });

    it('wwwroot/css directory created', function() {
      assert.file('webTest/wwwroot/css');
    });

    it('wwwroot/images directory created', function() {
      assert.file('webTest/wwwroot/images');
    });

    it('wwwroot/lib directory created', function() {
      assert.file('webTest/wwwroot/lib');
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

    it('Views directory created', function() {
      assert.file('webTest/Views');
    });

    it('Views/Account directory created', function() {
      assert.file('webTest/Views/Account');
    });

    it('Views/Home directory created', function() {
      assert.file('webTest/Views/Home');
    });

    it('Views/Shared directory created', function() {
      assert.file('webTest/Views/Shared');
    });

    it('Views/Manage directory created', function() {
      assert.file('webTest/Views/Manage');
    });
  });


  var files = [
    'webTest/.gitignore',
    'webTest/bower.json',
    'webTest/config.json',
    'webTest/gruntfile.js',
    'webTest/package.json',
    'webTest/project.json',
    'webTest/MessageService.cs',
    'webTest/Startup.cs',
    'webTest/Compiler/Preprocess/RazorPreCompilation.cs',
    'webTest/Controllers/AccountController.cs',
    'webTest/Controllers/HomeController.cs',
    'webTest/Models/AccountViewModels.cs',
    'webTest/Models/IdentityModels.cs',
    'webTest/Models/ManageViewModels.cs',
    'webTest/Views/Account/ConfirmEmail.cshtml',
    'webTest/Views/Account/ExternalLoginConfirmation.cshtml',
    'webTest/Views/Account/ExternalLoginFailure.cshtml',
    'webTest/Views/Account/ForgotPassword.cshtml',
    'webTest/Views/Account/ForgotPasswordConfirmation.cshtml',
    'webTest/Views/Account/Login.cshtml',
    'webTest/Views/Account/Register.cshtml',
    'webTest/Views/Account/ResetPassword.cshtml',
    'webTest/Views/Account/ResetPasswordConfirmation.cshtml',
    'webTest/Views/Account/SendCode.cshtml',
    'webTest/Views/Account/VerifyCode.cshtml',
    'webTest/Views/Home/Index.cshtml',
    'webTest/Views/Home/About.cshtml',
    'webTest/Views/Home/Contact.cshtml',
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
    'webTest/Migrations/000000000000000_CreateIdentitySchema.cs',
    'webTest/Migrations/ApplicationDbContextModelSnapshot.cs'
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

  });


  var files = ['webAPITest/project.json', 'webAPITest/Startup.cs', 'webAPITest/Controllers/ValuesController.cs'];
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
