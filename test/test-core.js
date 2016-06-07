'use strict';
var yeoman = require('yeoman-generator');
var assert = yeoman.assert;
var util = require('./test-utility');

/*
 * can be imported
 */
describe('aspnet Core 1.0 generator', function() {
  it('can be imported', function() {
    var app = require('../app');
    yeoman.assert.notEqual(app, undefined);
  });
});


/*
 * yo aspnet Empty Application
 */
describe('aspnet - Empty Web Application', function() {

  util.goCreateApplication('emptyweb', 'emptyWebTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('emptyWebTest/');
    });

    it('Properties directory created', function() {
      assert.file('emptyWebTest/Properties');
    });

    it('wwwroot directory created', function() {
      assert.file('emptyWebTest/wwwroot');
    });

  });

  var files = [
    'emptyWebTest/project.json',
    'emptyWebTest/Program.cs',
    'emptyWebTest/Properties/launchSettings.json',
    'emptyWebTest/README.md',
    'emptyWebTest/Startup.cs',
    'emptyWebTest/web.config',
    'emptyWebTest/Dockerfile'
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

  util.goCreateApplication('classlibrary', 'classLibraryTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('classLibraryTest/');
    });
  });

  var files = ['classLibraryTest/project.json', 'classLibraryTest/Class1.cs', 'classLibraryTest/.gitignore'];
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

  util.goCreateApplication('consoleapp', 'consoleAppTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('consoleAppTest/');
    });
  });

  var files = [
    'consoleAppTest/.gitignore',
    'consoleAppTest/Program.cs',
    'consoleAppTest/project.json'
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

  var files = [
    'unittestTest/.gitignore',
    'unittestTest/project.json',
    'unittestTest/SampleTest.cs'
  ];
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

  util.goCreateApplicationWithOptions('web', 'gruntTest', 'bootstrap', {
    grunt: 'grunt'
  });

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('gruntTest/');
    });

    it('grunt file created', function() {
      assert.file('gruntTest/Gruntfile.js');
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
      assert.noFile('gulpTest/Gruntfile.js');
    });
  });
});

/*
 * yo aspnet Web Application (Bootstrap)
 */
describe('aspnet - Web Application (Bootstrap)', function() {

  util.goCreateApplication('web', 'webTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webTest/');
    });

    it('Controllers directory created', function() {
      assert.file('webTest/Controllers');
    });

    it('Data directory created', function() {
      assert.file('webTest/Data');
    });

    it('Migrations directory created', function() {
      assert.file('webTest/Data/Migrations');
    });

    it('Models directory created', function() {
      assert.file('webTest/Models');
    });

    it('AccountViewModels directory created', function() {
      assert.file('webTest/Models/AccountViewModels');
    });

    it('Properties directory created', function() {
      assert.file('webTest/Properties');
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
    'webTest/appsettings.json',
    'webTest/bower.json',
    'webTest/Dockerfile',
    'webTest/gulpfile.js',
    'webTest/package.json',
    'webTest/Program.cs',
    'webTest/project.json',
    'webTest/README.md',
    'webTest/Startup.cs',
    'webTest/Controllers/AccountController.cs',
    'webTest/Controllers/HomeController.cs',
    'webTest/Controllers/ManageController.cs',
    'webTest/Data//ApplicationDbContext.cs',
    'webTest/Data/Migrations/00000000000000_CreateIdentitySchema.cs',
    'webTest/Data/Migrations/00000000000000_CreateIdentitySchema.Designer.cs',
    'webTest/Data/Migrations/ApplicationDbContextModelSnapshot.cs',
    'webTest/Models/AccountViewModels/ExternalLoginConfirmationViewModel.cs',
    'webTest/Models/AccountViewModels/ForgotPasswordViewModel.cs',
    'webTest/Models/AccountViewModels/RegisterViewModel.cs',
    'webTest/Models/AccountViewModels/ResetPasswordViewModel.cs',
    'webTest/Models/AccountViewModels/SendCodeViewModel.cs',
    'webTest/Models/AccountViewModels/VerifyCodeViewModel.cs',
    'webTest/Models/ApplicationUser.cs',
    'webTest/Models/ManageViewModels/AddPhoneNumberViewModel.cs',
    'webTest/Models/ManageViewModels/ChangePasswordViewModel.cs',
    'webTest/Models/ManageViewModels/ConfigureTwoFactorViewModel.cs',
    'webTest/Models/ManageViewModels/FactorViewModel.cs',
    'webTest/Models/ManageViewModels/IndexViewModel.cs',
    'webTest/Models/ManageViewModels/ManageLoginsViewModel.cs',
    'webTest/Models/ManageViewModels/SetPasswordViewModel.cs',
    'webTest/Models/ManageViewModels/VerifyPhoneNumberViewModel.cs',
    'webTest/Properties/launchSettings.json',
    'webTest/Services/IEmailSender.cs',
    'webTest/Services/ISmsSender.cs',
    'webTest/Services/MessageServices.cs',
    'webTest/Views/_ViewImports.cshtml',
    'webTest/Views/_ViewStart.cshtml',
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
    'webTest/Views/Manage/SetPassword.cshtml',
    'webTest/Views/Manage/VerifyPhoneNumber.cshtml',
    'webTest/Views/Shared/_Layout.cshtml',
    'webTest/Views/Shared/_LoginPartial.cshtml',
    'webTest/Views/Shared/_ValidationScriptsPartial.cshtml',
    'webTest/Views/Shared/Error.cshtml',
    'webTest/wwwroot/css/site.css',
    'webTest/wwwroot/css/site.min.css',
    'webTest/wwwroot/favicon.ico',
    'webTest/wwwroot/images/banner1.svg',
    'webTest/wwwroot/images/banner2.svg',
    'webTest/wwwroot/images/banner3.svg',
    'webTest/wwwroot/images/banner4.svg',
    'webTest/wwwroot/js/site.js',
    'webTest/wwwroot/js/site.min.js',
    'webTest/web.config'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('webTest/bower.json', /"name": "webtest"/);
    });
  });

});

/*
 * yo aspnet Web Application (Semantic UI)
 */
describe('aspnet - Web Application (Semantic UI)', function() {

  util.goCreateApplicationWithOptions('web', 'webTest', 'semantic', {});

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webTest/');
    });

    it('Controllers directory created', function() {
      assert.file('webTest/Controllers');
    });

    it('Data directory created', function() {
      assert.file('webTest/Data');
    });

    it('Migrations directory created', function() {
      assert.file('webTest/Data/Migrations');
    });

    it('Models directory created', function() {
      assert.file('webTest/Models');
    });

    it('AccountViewModels directory created', function() {
      assert.file('webTest/Models/AccountViewModels');
    });

    it('Properties directory created', function() {
      assert.file('webTest/Properties');
    });

    it('Services directory created', function() {
      assert.file('webTest/Services');
    });

    it('Services directory created', function() {
      assert.file('webTest/TagHelpers');
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
    'webTest/appsettings.json',
    'webTest/bower.json',
    'webTest/Dockerfile',
    'webTest/gulpfile.js',
    'webTest/package.json',
    'webTest/Program.cs',
    'webTest/project.json',
    'webTest/README.md',
    'webTest/Startup.cs',
    'webTest/Controllers/AccountController.cs',
    'webTest/Controllers/HomeController.cs',
    'webTest/Controllers/ManageController.cs',
    'webTest/Data//ApplicationDbContext.cs',
    'webTest/Data/Migrations/00000000000000_CreateIdentitySchema.cs',
    'webTest/Data/Migrations/00000000000000_CreateIdentitySchema.Designer.cs',
    'webTest/Data/Migrations/ApplicationDbContextModelSnapshot.cs',
    'webTest/Models/AccountViewModels/ExternalLoginConfirmationViewModel.cs',
    'webTest/Models/AccountViewModels/ForgotPasswordViewModel.cs',
    'webTest/Models/AccountViewModels/RegisterViewModel.cs',
    'webTest/Models/AccountViewModels/ResetPasswordViewModel.cs',
    'webTest/Models/AccountViewModels/SendCodeViewModel.cs',
    'webTest/Models/AccountViewModels/VerifyCodeViewModel.cs',
    'webTest/Models/ApplicationUser.cs',
    'webTest/Models/ManageViewModels/AddPhoneNumberViewModel.cs',
    'webTest/Models/ManageViewModels/ChangePasswordViewModel.cs',
    'webTest/Models/ManageViewModels/ConfigureTwoFactorViewModel.cs',
    'webTest/Models/ManageViewModels/FactorViewModel.cs',
    'webTest/Models/ManageViewModels/IndexViewModel.cs',
    'webTest/Models/ManageViewModels/ManageLoginsViewModel.cs',
    'webTest/Models/ManageViewModels/SetPasswordViewModel.cs',
    'webTest/Models/ManageViewModels/VerifyPhoneNumberViewModel.cs',
    'webTest/Properties/launchSettings.json',
    'webTest/Services/IEmailSender.cs',
    'webTest/Services/ISmsSender.cs',
    'webTest/Services/MessageServices.cs',
    'webTest/Views/_ViewImports.cshtml',
    'webTest/Views/_ViewStart.cshtml',
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
    'webTest/Views/Manage/SetPassword.cshtml',
    'webTest/Views/Manage/VerifyPhoneNumber.cshtml',
    'webTest/Views/Shared/_Layout.cshtml',
    'webTest/Views/Shared/_LoginPartial.cshtml',
    'webTest/Views/Shared/_ValidationScriptsPartial.cshtml',
    'webTest/Views/Shared/Error.cshtml',
    'webTest/wwwroot/css/site.css',
    'webTest/wwwroot/css/site.min.css',
    'webTest/wwwroot/favicon.ico',
    'webTest/wwwroot/images/banner1.svg',
    'webTest/wwwroot/images/banner2.svg',
    'webTest/wwwroot/images/banner3.svg',
    'webTest/wwwroot/images/banner4.svg',
    'webTest/wwwroot/js/semantic.validation.js',
    'webTest/wwwroot/js/semantic.validation.min.js',
    'webTest/wwwroot/js/site.js',
    'webTest/wwwroot/js/site.min.js',
    'webTest/web.config'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('webTest/bower.json', /"name": "webtest"/);
    });
  });


  describe('Checking file content for overrides', function() {

    it('_Layout.cshtml contains menulink tags', function() {
      assert.fileContent('webTest/Views/Shared/_Layout.cshtml', "menulink");
    });

    it('_ViewImports.cshtml contains TagHelper', function() {
      assert.fileContent('webTest/Views/_ViewImports.cshtml', '*, webTest');
    });

    it('_ValidationScriptsPartial.cshtml contains reference to semantic.validation.js', function() {
      assert.fileContent('webTest/Views/Shared/_ValidationScriptsPartial.cshtml', 'semantic.validation.js');
    });

    it('site.css is overridden', function() {
      assert.fileContent('webTest/wwwroot/css/site.css', '.masthead');
    });

    it('site.js is overridden', function() {
      assert.fileContent('webTest/wwwroot/js/site.js', '.sidebar(');
    });

    //We wont explicitly check every single file in every directory, one file per directory should suffice

    it('Views/Account/ConfirmEmail.cshtml contains Semantic UI markup', function() {
      assert.fileContent('webTest/Views/Account/ConfirmEmail.cshtml', 'ui header');
    });

    it('Views/Home/About.cshtml contains Semantic UI markup', function() {
      assert.fileContent('webTest/Views/Home/About.cshtml', 'ui container');
    });

    it('Views/Manage/AddPhoneNumber.cshtml contains Semantic UI markup', function() {
      assert.fileContent('webTest/Views/Manage/AddPhoneNumber.cshtml', 'ui header');
    });

    it('Views/Shared/Error.cshtml contains Semantic UI markup', function() {
      assert.fileContent('webTest/Views/Shared/Error.cshtml', 'ui header');
    });

    it('bower.json contains semantic references', function() {
      assert.fileContent('webTest/bower.json', 'semantic');
    });
  });

});

/*
 * yo aspnet Web Application (Bootstrap)
 */
describe('aspnet - Web Application Basic (Bootstrap)', function() {

  util.goCreateApplication('webbasic', 'webTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webTest/');
    });

    it('Controllers directory created', function() {
      assert.file('webTest/Controllers');
    });

    it('Properties directory created', function() {
      assert.file('webTest/Properties');
    });

    it('Views directory created', function() {
      assert.file('webTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('webTest/Views/Home');
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
    'webTest/Dockerfile',
    'webTest/.bowerrc',
    'webTest/.gitignore',
    'webTest/bower.json',
    'webTest/bundleconfig.json',
    'webTest/appsettings.json',
    'webTest/Controllers/HomeController.cs',
    'webTest/Program.cs',
    'webTest/project.json',
    'webTest/Properties/launchSettings.json',
    'webTest/README.md',
    'webTest/Startup.cs',
    'webTest/Views/_ViewImports.cshtml',
    'webTest/Views/_ViewStart.cshtml',
    'webTest/Views/Home/About.cshtml',
    'webTest/Views/Home/Contact.cshtml',
    'webTest/Views/Home/Index.cshtml',
    'webTest/Views/Shared/_Layout.cshtml',
    'webTest/Views/Shared/Error.cshtml',
    'webTest/wwwroot/css/site.css',
    'webTest/wwwroot/css/site.min.css',
    'webTest/wwwroot/favicon.ico',
    'webTest/wwwroot/images/banner1.svg',
    'webTest/wwwroot/images/banner2.svg',
    'webTest/wwwroot/images/banner3.svg',
    'webTest/wwwroot/images/banner4.svg',
    'webTest/wwwroot/js/site.js',
    'webTest/wwwroot/js/site.min.js',
    'webTest/web.config'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('webTest/bower.json', /"name": "webtest"/);
    });
  });

});

/*
 * yo aspnet Web Application (Semantic UI)
 */
describe('aspnet - Web Application Basic (Semantic UI)', function() {

  util.goCreateApplicationWithOptions('webbasic', 'webTest', 'semantic', {});

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('webTest/');
    });

    it('Controllers directory created', function() {
      assert.file('webTest/Controllers');
    });

    it('Properties directory created', function() {
      assert.file('webTest/Properties');
    });

    it('TagHelpers directory created', function() {
      assert.file('webTest/TagHelpers');
    });

    it('Views directory created', function() {
      assert.file('webTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('webTest/Views/Home');
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
    'webTest/Dockerfile',
    'webTest/.bowerrc',
    'webTest/.gitignore',
    'webTest/bower.json',
    'webTest/appsettings.json',
    'webTest/Controllers/HomeController.cs',
    'webTest/Program.cs',
    'webTest/project.json',
    'webTest/Properties/launchSettings.json',
    'webTest/README.md',
    'webTest/Startup.cs',
    'webTest/TagHelpers/MenuLinkTagHelper.cs',
    'webTest/Views/_ViewImports.cshtml',
    'webTest/Views/_ViewStart.cshtml',
    'webTest/Views/Home/About.cshtml',
    'webTest/Views/Home/Contact.cshtml',
    'webTest/Views/Home/Index.cshtml',
    'webTest/Views/Shared/_Layout.cshtml',
    'webTest/Views/Shared/Error.cshtml',
    'webTest/wwwroot/css/site.css',
    'webTest/wwwroot/css/site.min.css',
    'webTest/wwwroot/favicon.ico',
    'webTest/wwwroot/images/banner1.svg',
    'webTest/wwwroot/images/banner2.svg',
    'webTest/wwwroot/images/banner3.svg',
    'webTest/wwwroot/images/banner4.svg',
    'webTest/wwwroot/js/semantic.validation.js',
    'webTest/wwwroot/js/semantic.validation.js',
    'webTest/wwwroot/js/site.js',
    'webTest/wwwroot/js/site.min.js',
    'webTest/web.config'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('webTest/bower.json', /"name": "webtest"/);
    });
  });

  describe('Checking file content for overrides', function() {

    it('_Layout.cshtml contains menulink tags', function() {
      assert.fileContent('webTest/Views/Shared/_Layout.cshtml', "menulink");
    });

    it('_ViewImports.cshtml contains TagHelper', function() {
      assert.fileContent('webTest/Views/_ViewImports.cshtml', '*, webTest');
    });

    it('site.css is overridden', function() {
      assert.fileContent('webTest/wwwroot/css/site.css', '.masthead');
    });

    it('site.js is overridden', function() {
      assert.fileContent('webTest/wwwroot/js/site.js', '.sidebar(');
    });

    //We wont explicitly check every single file in every directory, one file per directory should suffice

    it('Views/Home/About.cshtml contains Semantic UI markup', function() {
      assert.fileContent('webTest/Views/Home/About.cshtml', 'ui container');
    });

    it('Views/Shared/Error.cshtml contains Semantic UI markup', function() {
      assert.fileContent('webTest/Views/Shared/Error.cshtml', 'ui header');
    });

    it('bower.json contains semantic references', function() {
      assert.fileContent('webTest/bower.json', 'semantic');
    });
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
    'webAPITest/appsettings.json',
    'webAPITest/project.json',
    'webAPITest/Program.cs',
    'webAPITest/Properties/launchSettings.json',
    'webAPITest/README.md',
    'webAPITest/Startup.cs',
    'webAPITest/.gitignore',
    'webAPITest/web.config',
    'webAPITest/Dockerfile'
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


/*
 * command line options
 */
describe('command line options', function() {
  it('keeps project type and application name if passed correctly from CLI', function() {
    var app = require('../app');
    app.prototype.log = function() {}; //stub
    app.prototype.type = 'webbasic';
    app.prototype.applicationName = 'myWebApp';
    app.prototype.ui = 'bootstrap';

    app.prototype._checkProjectType();

    assert.equal('webbasic', app.prototype.type);
    assert.equal('myWebApp', app.prototype.applicationName);
    assert.equal('bootstrap', app.prototype.ui);
  });

  it('removes project type and application name if invalid project type', function() {
    var app = require('../app');
    app.prototype.log = function() {}; //stub
    app.prototype.type = 'not-a-real-project-type';
    app.prototype.applicationName = 'myWebApp';

    app.prototype._checkProjectType();

    assert.equal(undefined, app.prototype.type);
    assert.equal(undefined, app.prototype.applicationName);
  });
});
