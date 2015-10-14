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
  });
});


/*
 * yo aspnet Empty Application
 */
describe('aspnet - solution - Empty Application', function() {

  util.goCreateApplicationWithPrompts('empty', 'emptyTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('emptyTest/');
      assert.file('emptyTest/src/emptyTest/');
    });

    it('wwwroot directory created', function() {
      assert.file('emptyTest/src/emptyTest/wwwroot');
    });

  });

  var files = [
    'emptyTest/src/emptyTest/hosting.ini',
    'emptyTest/src/emptyTest/project.json',
    'emptyTest/src/emptyTest/Startup.cs',
    'emptyTest/src/emptyTest/wwwroot/README.md',
    'emptyTest/src/emptyTest/Dockerfile',
    'emptyTest/global.json'
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
describe('aspnet - solution - Class Library', function() {

  util.goCreateApplicationWithPrompts('classlib', 'classTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('classTest/src/classTest/');
    });
  });

  var files = ['classTest/src/classTest/project.json', 'classTest/src/classTest/Class1.cs', 'classTest/.gitignore', 'classTest/global.json'];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});


/*
 * yo aspnet Console Application
 */
describe('aspnet - solution - Console Application', function() {

  util.goCreateApplicationWithPrompts('console', 'consoleTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('consoleTest/src/consoleTest/');
    });
  });

  var files = [
    'consoleTest/.gitignore',
    'consoleTest/global.json',
    'consoleTest/src/consoleTest/Program.cs',
    'consoleTest/src/consoleTest/project.json'
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
describe('aspnet - solution - Unit Test Application', function() {

  util.goCreateApplicationWithPrompts('unittest', 'unittestTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('unittestTest/tests/unittestTest/');
    });
  });

  var files = [
    'unittestTest/.gitignore',
    'unittestTest/tests/unittestTest/project.json',
    'unittestTest/tests/unittestTest/SampleTest.cs'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});

/*
 * yo aspnet Console Application
 */
describe('aspnet - solution - Console Application w/Tests project', function() {

  util.goCreateApplicationWithPrompts('console', 'consoleTest', {
    projectStructure: true,
    testProject: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('consoleTest/src/consoleTest/');
    });
  });

  var files = [
    'consoleTest/.gitignore',
    'consoleTest/global.json',
    'consoleTest/src/consoleTest/Program.cs',
    'consoleTest/src/consoleTest/project.json'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

  describe('Checking test directories', function() {
    it('Application directory created', function() {
      assert.file('consoleTest/tests/consoleTest.Tests/');
    });
  });

  var files = [
    'consoleTest/tests/consoleTest.Tests/project.json',
    'consoleTest/tests/consoleTest.Tests/SampleTest.cs'
  ];
  describe('Checking test files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});

/*
 * yo aspnet Web Application - Grunt option
 */
describe('aspnet - solution - Web Application w/grunt', function() {

  util.goCreateApplicationWithOptions('web', 'gruntTest', {
    grunt: 'grunt'
  }, {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gruntTest/src/gruntTest/');
    });

    it('grunt file created', function() {
      assert.file('gruntTest/src/gruntTest/Gruntfile.js');
    });

    it('gulpfile does NOT exist', function() {
      assert.noFile('gruntTest/src/gruntTest/gulpfile.js');
    });
  });
});

/*
 * yo aspnet Web Application - No Grunt option
 */
describe('aspnet - solution - Web Application w/o grunt', function() {

  util.goCreateApplicationWithPrompts('web', 'gulpTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gulpTest/src/gulpTest/');
    });

    it('gulp file created', function() {
      assert.file('gulpTest/src/gulpTest/gulpfile.js');
    });

    it('grunt file does NOT exist', function() {
      assert.noFile('gulpTest/src/gulpTest/Gruntfile.js');
    });
  });
});

/*
 * yo aspnet Web Application
 */
describe('aspnet - solution - Web Application', function() {

  util.goCreateApplicationWithPrompts('web', 'webTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webTest/src/webTest/');
    });

    it('Controllers directory created', function() {
      assert.file('webTest/src/webTest/Controllers');
    });

    it('Migrations directory created', function() {
      assert.file('webTest/src/webTest/Migrations');
    });


    it('Models directory created', function() {
      assert.file('webTest/src/webTest/Models');
    });

    it('Services directory created', function() {
      assert.file('webTest/src/webTest/Services');
    });

    it('ViewModels directory created', function() {
      assert.file('webTest/src/webTest/ViewModels');
    });

    it('ViewModels/Account directory created', function() {
      assert.file('webTest/src/webTest/ViewModels/Account');
    });

    it('ViewModels/Manage directory created', function() {
      assert.file('webTest/src/webTest/ViewModels/Manage');
    });

    it('Views directory created', function() {
      assert.file('webTest/src/webTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('webTest/src/webTest/Views/Home');
    });

    it('Views/Manage directory created', function() {
      assert.file('webTest/src/webTest/Views/Manage');
    });

    it('Views/Shared directory created', function() {
      assert.file('webTest/src/webTest/Views/Shared');
    });

    it('wwwroot directory created', function() {
      assert.file('webTest/src/webTest/wwwroot');
    });

    it('wwwroot/css directory created', function() {
      assert.file('webTest/src/webTest/wwwroot/css');
    });

    it('wwwroot/images directory created', function() {
      assert.file('webTest/src/webTest/wwwroot/images');
    });

    it('wwwroot/js directory created', function() {
      assert.file('webTest/src/webTest/wwwroot/js');
    });

  });


  var files = [
    'webTest/src/webTest/Dockerfile',
    'webTest/src/webTest/.bowerrc',
    'webTest/\.gitignore', 'webTest/global.json',
    'webTest/src/webTest/bower.json',
    'webTest/src/webTest/config.json',
    'webTest/src/webTest/gulpfile.js',
    'webTest/src/webTest/hosting.ini',
    'webTest/src/webTest/package.json',
    'webTest/src/webTest/project.json',
    'webTest/src/webTest/README.md',
    'webTest/src/webTest/Startup.cs',
    'webTest/src/webTest/Controllers/AccountController.cs',
    'webTest/src/webTest/Controllers/HomeController.cs',
    'webTest/src/webTest/Controllers/ManageController.cs',
    'webTest/src/webTest/Migrations/00000000000000_Initial.cs',
    'webTest/src/webTest/Migrations/00000000000000_Initial.Designer.cs',
    'webTest/src/webTest/Migrations/ApplicationDbContextModelSnapshot.cs',
    'webTest/src/webTest/Models/ApplicationDbContext.cs',
    'webTest/src/webTest/Models/ApplicationUser.cs',
    'webTest/src/webTest/Services/IEmailSender.cs',
    'webTest/src/webTest/Services/ISmsSender.cs',
    'webTest/src/webTest/Services/MessageServices.cs',
    'webTest/src/webTest/ViewModels/Account/ExternalLoginConfirmationViewModel.cs',
    'webTest/src/webTest/ViewModels/Account/ForgotPasswordViewModel.cs',
    'webTest/src/webTest/ViewModels/Account/LoginPasswordViewModel.cs',
    'webTest/src/webTest/ViewModels/Account/RegisterViewModel.cs',
    'webTest/src/webTest/ViewModels/Account/ResetPasswordViewModel.cs',
    'webTest/src/webTest/ViewModels/Account/SendCodeViewModel.cs',
    'webTest/src/webTest/ViewModels/Account/VerifyCodeViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/AddPhoneNumberViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/ChangePasswordViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/ConfigureTwoFactorViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/FactorViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/IndexViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/ManageLoginsViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/SetPasswordViewModel.cs',
    'webTest/src/webTest/ViewModels/Manage/VerifyPhoneNumberViewModel.cs',
    'webTest/src/webTest/Views/Account/ConfirmEmail.cshtml',
    'webTest/src/webTest/Views/Account/ExternalLoginConfirmation.cshtml',
    'webTest/src/webTest/Views/Account/ExternalLoginFailure.cshtml',
    'webTest/src/webTest/Views/Account/ForgotPassword.cshtml',
    'webTest/src/webTest/Views/Account/ForgotPasswordConfirmation.cshtml',
    'webTest/src/webTest/Views/Account/Lockout.cshtml',
    'webTest/src/webTest/Views/Account/Login.cshtml',
    'webTest/src/webTest/Views/Account/Register.cshtml',
    'webTest/src/webTest/Views/Account/ResetPassword.cshtml',
    'webTest/src/webTest/Views/Account/ResetPasswordConfirmation.cshtml',
    'webTest/src/webTest/Views/Account/SendCode.cshtml',
    'webTest/src/webTest/Views/Account/VerifyCode.cshtml',
    'webTest/src/webTest/Views/Home/About.cshtml',
    'webTest/src/webTest/Views/Home/Contact.cshtml',
    'webTest/src/webTest/Views/Home/Index.cshtml',
    'webTest/src/webTest/Views/Manage/AddPhoneNumber.cshtml',
    'webTest/src/webTest/Views/Manage/ChangePassword.cshtml',
    'webTest/src/webTest/Views/Manage/Index.cshtml',
    'webTest/src/webTest/Views/Manage/ManageLogins.cshtml',
    'webTest/src/webTest/Views/Manage/RemoveLogin.cshtml',
    'webTest/src/webTest/Views/Manage/SetPassword.cshtml',
    'webTest/src/webTest/Views/Manage/VerifyPhoneNumber.cshtml',
    'webTest/src/webTest/Views/Shared/Error.cshtml',
    'webTest/src/webTest/Views/Shared/_Layout.cshtml',
    'webTest/src/webTest/Views/Shared/_LoginPartial.cshtml',
    'webTest/src/webTest/Views/Shared/_ValidationScriptsPartial.cshtml',
    'webTest/src/webTest/Views/_ViewImports.cshtml',
    'webTest/src/webTest/Views/_ViewStart.cshtml',
    'webTest/src/webTest/wwwroot/css/site.css',
    'webTest/src/webTest/wwwroot/favicon.ico',
    'webTest/src/webTest/wwwroot/images/ASP-NET-Banners-01.png',
    'webTest/src/webTest/wwwroot/images/ASP-NET-Banners-02.png',
    'webTest/src/webTest/wwwroot/images/Banner-01-Azure.png',
    'webTest/src/webTest/wwwroot/images/Banner-02-VS.png',
    'webTest/src/webTest/wwwroot/js/site.js'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});

/*
 * yo aspnet Web Application Basic - Grunt option
 */
describe('aspnet - solution - Web Application Basic w/grunt', function() {

  util.goCreateApplicationWithOptions('webbasic', 'gruntTest', {
    grunt: 'grunt'
  }, {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gruntTest/src/gruntTest/');
    });

    it('grunt file created', function() {
      assert.file('gruntTest/src/gruntTest/Gruntfile.js');
    });

    it('gulpfile does NOT exist', function() {
      assert.noFile('gruntTest/src/gruntTest/gulpfile.js');
    });
  });
});

/*
 * yo aspnet Web Application Basic - No Grunt option
 */
describe('aspnet - solution - Web Application Basic w/o grunt', function() {

  util.goCreateApplicationWithPrompts('webbasic', 'gulpTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gulpTest/src/gulpTest/');
    });

    it('gulp file created', function() {
      assert.file('gulpTest/src/gulpTest/gulpfile.js');
    });

    it('grunt file does NOT exist', function() {
      assert.noFile('gulpTest/src/gulpTest/Gruntfile.js');
    });
  });
});

/*
 * yo aspnet Web Application
 */
describe('aspnet - solution - Web Application Basic', function() {

  util.goCreateApplicationWithPrompts('webbasic', 'webTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webTest/src/webTest/');
    });

    it('Controllers directory created', function() {
      assert.file('webTest/src/webTest/Controllers');
    });

    it('Views directory created', function() {
      assert.file('webTest/src/webTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('webTest/src/webTest/Views/Home');
    });

    it('Views/Shared directory created', function() {
      assert.file('webTest/src/webTest/Views/Shared');
    });

    it('wwwroot directory created', function() {
      assert.file('webTest/src/webTest/wwwroot');
    });

    it('wwwroot/css directory created', function() {
      assert.file('webTest/src/webTest/wwwroot/css');
    });

    it('wwwroot/images directory created', function() {
      assert.file('webTest/src/webTest/wwwroot/images');
    });

    it('wwwroot/js directory created', function() {
      assert.file('webTest/src/webTest/wwwroot/js');
    });

  });

  var files = [
    'webTest/src/webTest/Dockerfile',
    'webTest/src/webTest/.bowerrc',
    'webTest/\.gitignore', 'webTest/global.json',
    'webTest/src/webTest/bower.json',
    'webTest/src/webTest/config.json',
    'webTest/src/webTest/Controllers/HomeController.cs',
    'webTest/src/webTest/gulpfile.js',
    'webTest/src/webTest/hosting.ini',
    'webTest/src/webTest/package.json',
    'webTest/src/webTest/project.json',
    'webTest/src/webTest/README.md',
    'webTest/src/webTest/Startup.cs',
    'webTest/src/webTest/Views/_ViewImports.cshtml',
    'webTest/src/webTest/Views/_ViewStart.cshtml',
    'webTest/src/webTest/Views/Home/About.cshtml',
    'webTest/src/webTest/Views/Home/Contact.cshtml',
    'webTest/src/webTest/Views/Home/Index.cshtml',
    'webTest/src/webTest/Views/Shared/_Layout.cshtml',
    'webTest/src/webTest/Views/Shared/Error.cshtml',
    'webTest/src/webTest/wwwroot/css/site.css',
    'webTest/src/webTest/wwwroot/favicon.ico',
    'webTest/src/webTest/wwwroot/images/ASP-NET-Banners-01.png',
    'webTest/src/webTest/wwwroot/images/ASP-NET-Banners-02.png',
    'webTest/src/webTest/wwwroot/images/Banner-01-Azure.png',
    'webTest/src/webTest/wwwroot/images/Banner-02-VS.png',
    'webTest/src/webTest/wwwroot/js/site.js'
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
describe('aspnet - solution - Web API Application', function() {

  util.goCreateApplicationWithPrompts('webapi', 'webAPITest', {
    projectStructure: true
  });

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webAPITest/src/webAPITest/');
    });

    it('Controllers directory created', function() {
      assert.file('webAPITest/src/webAPITest/Controllers');
    });

    it('Properties directory created', function() {
      assert.file('webAPITest/src/webAPITest/Properties');
    });

    it('wwwroot directory created', function() {
      assert.file('webAPITest/src/webAPITest/wwwroot');
    });
  });


  var files = [
    'webAPITest/src/webAPITest/Controllers/ValuesController.cs',
    'webAPITest/src/webAPITest/hosting.ini',
    'webAPITest/src/webAPITest/project.json',
    'webAPITest/src/webAPITest/Properties/launchSettings.json',
    'webAPITest/src/webAPITest/Startup.cs',
    'webAPITest/\.gitignore', 'webAPITest/global.json',
    'webAPITest/src/webAPITest/wwwroot/README.md',
    'webAPITest/src/webAPITest/Dockerfile'
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
describe('aspnet - solution - Nancy Application', function() {

  util.goCreateApplicationWithPrompts('nancy', 'nancyTest', {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('nancyTest/src/nancyTest/');
    });
  });


  var files = ['nancyTest/src/nancyTest/project.json', 'nancyTest/src/nancyTest/Startup.cs', 'nancyTest/src/nancyTest/HomeModule.cs'];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});


/*
 * yo aspnet Unit Test Application
 */
describe('aspnet - generates application using name configuration', function() {

  util.goCreateApplicationWithOptions('unittest', 'unittestTest', {
    name: "unittestTestOverride"
  }, {
    projectStructure: true
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('unittestTestOverride/tests/unittestTestOverride/');
    });
  });

  var files = [
    'unittestTestOverride/.gitignore',
    'unittestTestOverride/tests/unittestTestOverride/project.json',
    'unittestTestOverride/tests/unittestTestOverride/SampleTest.cs'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }
  });

});
