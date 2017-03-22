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
* package.json contains dotnet target and version information
*/
describe('package.json contains dotnet version information', function() {
  var pckg = require('../package.json');
  it('contains expected LTS version', function() {
    yeoman.assert.equal('1.0.4', pckg.dotnet.lts.version);
  });
  it('contains expected LTS target framework', function() {
    yeoman.assert.equal('netcoreapp1.0', pckg.dotnet.lts.targetFramework);
  });
  it('contains expected Current version', function() {
    yeoman.assert.equal('1.1.1', pckg.dotnet.current.version);
  });
  it('contains expected LTS version', function() {
    yeoman.assert.equal('netcoreapp1.1', pckg.dotnet.current.targetFramework);
  });
});

/*
 * yo aspnet Empty Application
 */
describe('aspnet - Empty Web Application', function() {

  util.goCreateApplication('web', 'emptyWebTest');

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
    'emptyWebTest/.gitignore',
    'emptyWebTest/global.json',
    'emptyWebTest/emptyWebTest.csproj',
    'emptyWebTest/Program.cs',
    'emptyWebTest/Properties/launchSettings.json',
    'emptyWebTest/README.md',
    'emptyWebTest/runtimeconfig.template.json',
    'emptyWebTest/Startup.cs',
    'emptyWebTest/web.config'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('emptyWebTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.csproj contains correct dotnet version', function() {
      assert.fileContent('emptyWebTest/emptyWebTest.csproj', /PackageReference Include="Microsoft.AspNetCore" Version="1.0.4"/);
    });

    it('.csproj contains correct dotnet target platform', function() {
      assert.fileContent('emptyWebTest/emptyWebTest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * yo aspnet Class Library
 */
describe('aspnet - Class Library', function() {

  util.goCreateApplication('classlib', 'classLibraryTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('classLibraryTest/');
    });
  });

  var files = ['classLibraryTest/global.json', 'classLibraryTest/classLibraryTest.csproj', 'classLibraryTest/Class1.cs', 'classLibraryTest/.gitignore'];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('classLibraryTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.csproj contains correct version', function() {
      assert.fileContent('classLibraryTest/classLibraryTest.csproj', /<TargetFramework\>netstandard1\.4<\/TargetFramework>/);
    });

  });

});


/*
 * yo aspnet Console Application
 */
describe('aspnet - Console Application', function() {

  util.goCreateApplication('console', 'consoleAppTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('consoleAppTest/');
    });
  });

  var files = [
    'consoleAppTest/.gitignore',
    'consoleAppTest/Program.cs',
    'consoleAppTest/global.json',
    'consoleAppTest/consoleAppTest.csproj'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('consoleAppTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.csproj contains correct version', function() {
      assert.fileContent('consoleAppTest/consoleAppTest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * yo aspnet Unit Test Application
 */
describe('aspnet - xUnit Test Application', function() {

  util.goCreateApplication('xunit', 'xunitTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('xunitTest/');
    });
  });

  var files = [
    'xunitTest/.gitignore',
    'xunitTest/global.json',
    'xunitTest/xunitTest.csproj',
    'xunitTest/UnitTest1.cs',
    'xunitTest/xunit.runner.json'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('xunitTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.csproj contains correct version', function() {
      assert.fileContent('xunitTest/xunitTest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * MSTest Unit Test
 */
describe('aspnet - MSTest Unit Test', function() {

  util.goCreateApplication('mstest', 'mstest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('mstest/');
    });
  });

  var files = [
    'mstest/.gitignore',
    'mstest/global.json',
    'mstest/mstest.csproj',
    'mstest/UnitTest1.cs'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('mstest/global.json', /1.0.0-rc4-004771/);
    });

    it('.csproj contains correct version', function() {
      assert.fileContent('mstest/mstest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * yo aspnet Web Application (Bootstrap)
 */
describe('aspnet - Web Application (Bootstrap)', function() {

  util.goCreateApplication('mvc', 'mvcTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('mvcTest/');
    });

    it('Controllers directory created', function() {
      assert.file('mvcTest/Controllers');
    });

    it('Data directory created', function() {
      assert.file('mvcTest/Data');
    });

    it('Migrations directory created', function() {
      assert.file('mvcTest/Data/Migrations');
    });

    it('Models directory created', function() {
      assert.file('mvcTest/Models');
    });

    it('AccountViewModels directory created', function() {
      assert.file('mvcTest/Models/AccountViewModels');
    });

    it('Properties directory created', function() {
      assert.file('mvcTest/Properties');
    });

    it('Services directory created', function() {
      assert.file('mvcTest/Services');
    });

    it('Views directory created', function() {
      assert.file('mvcTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('mvcTest/Views/Home');
    });

    it('Views/Manage directory created', function() {
      assert.file('mvcTest/Views/Manage');
    });

    it('Views/Shared directory created', function() {
      assert.file('mvcTest/Views/Shared');
    });

    it('wwwroot directory created', function() {
      assert.file('mvcTest/wwwroot');
    });

    it('wwwroot/css directory created', function() {
      assert.file('mvcTest/wwwroot/css');
    });

    it('wwwroot/images directory created', function() {
      assert.file('mvcTest/wwwroot/images');
    });

    it('wwwroot/js directory created', function() {
      assert.file('mvcTest/wwwroot/js');
    });

  });


  var files = [
    'mvcTest/.bowerrc',
    'mvcTest/.gitignore',
    'mvcTest/appsettings.json',
    'mvcTest/appsettings.Development.json',
    'mvcTest/bower.json',
    'mvcTest/bundleconfig.json',
    'mvcTest/mvcTest.csproj',
    'mvcTest/mvcTest.db',
    'mvcTest/Controllers/AccountController.cs',
    'mvcTest/Controllers/HomeController.cs',
    'mvcTest/Controllers/ManageController.cs',
    'mvcTest/Data//ApplicationDbContext.cs',
    'mvcTest/Data/Migrations/00000000000000_CreateIdentitySchema.cs',
    'mvcTest/Data/Migrations/00000000000000_CreateIdentitySchema.Designer.cs',
    'mvcTest/Data/Migrations/ApplicationDbContextModelSnapshot.cs',
    'mvcTest/global.json',
    'mvcTest/Models/AccountViewModels/ExternalLoginConfirmationViewModel.cs',
    'mvcTest/Models/AccountViewModels/ForgotPasswordViewModel.cs',
    'mvcTest/Models/AccountViewModels/RegisterViewModel.cs',
    'mvcTest/Models/AccountViewModels/ResetPasswordViewModel.cs',
    'mvcTest/Models/AccountViewModels/SendCodeViewModel.cs',
    'mvcTest/Models/AccountViewModels/VerifyCodeViewModel.cs',
    'mvcTest/Models/ApplicationUser.cs',
    'mvcTest/Models/ManageViewModels/AddPhoneNumberViewModel.cs',
    'mvcTest/Models/ManageViewModels/ChangePasswordViewModel.cs',
    'mvcTest/Models/ManageViewModels/ConfigureTwoFactorViewModel.cs',
    'mvcTest/Models/ManageViewModels/FactorViewModel.cs',
    'mvcTest/Models/ManageViewModels/IndexViewModel.cs',
    'mvcTest/Models/ManageViewModels/ManageLoginsViewModel.cs',
    'mvcTest/Models/ManageViewModels/SetPasswordViewModel.cs',
    'mvcTest/Models/ManageViewModels/VerifyPhoneNumberViewModel.cs',
    'mvcTest/Program.cs',
    'mvcTest/Properties/launchSettings.json',
    'mvcTest/README.md',
    'mvcTest/Services/IEmailSender.cs',
    'mvcTest/Services/ISmsSender.cs',
    'mvcTest/Services/MessageServices.cs',
    'mvcTest/Startup.cs',
    'mvcTest/Views/_ViewImports.cshtml',
    'mvcTest/Views/_ViewStart.cshtml',
    'mvcTest/Views/Account/ConfirmEmail.cshtml',
    'mvcTest/Views/Account/ExternalLoginConfirmation.cshtml',
    'mvcTest/Views/Account/ExternalLoginFailure.cshtml',
    'mvcTest/Views/Account/ForgotPassword.cshtml',
    'mvcTest/Views/Account/ForgotPasswordConfirmation.cshtml',
    'mvcTest/Views/Account/Lockout.cshtml',
    'mvcTest/Views/Account/Login.cshtml',
    'mvcTest/Views/Account/Register.cshtml',
    'mvcTest/Views/Account/ResetPassword.cshtml',
    'mvcTest/Views/Account/ResetPasswordConfirmation.cshtml',
    'mvcTest/Views/Account/SendCode.cshtml',
    'mvcTest/Views/Account/VerifyCode.cshtml',
    'mvcTest/Views/Home/About.cshtml',
    'mvcTest/Views/Home/Contact.cshtml',
    'mvcTest/Views/Home/Index.cshtml',
    'mvcTest/Views/Manage/AddPhoneNumber.cshtml',
    'mvcTest/Views/Manage/ChangePassword.cshtml',
    'mvcTest/Views/Manage/Index.cshtml',
    'mvcTest/Views/Manage/ManageLogins.cshtml',
    'mvcTest/Views/Manage/SetPassword.cshtml',
    'mvcTest/Views/Manage/VerifyPhoneNumber.cshtml',
    'mvcTest/Views/Shared/_Layout.cshtml',
    'mvcTest/Views/Shared/_LoginPartial.cshtml',
    'mvcTest/Views/Shared/_ValidationScriptsPartial.cshtml',
    'mvcTest/Views/Shared/Error.cshtml',
    'mvcTest/web.config',
    'mvcTest/wwwroot/css/site.css',
    'mvcTest/wwwroot/css/site.min.css',
    'mvcTest/wwwroot/favicon.ico',
    'mvcTest/wwwroot/images/banner1.svg',
    'mvcTest/wwwroot/images/banner2.svg',
    'mvcTest/wwwroot/images/banner3.svg',
    'mvcTest/wwwroot/images/banner4.svg',
    'mvcTest/wwwroot/js/site.js',
    'mvcTest/wwwroot/js/site.min.js'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('mvcTest/bower.json', /"name": "mvctest"/);
    });

    it('global.json contains correct version', function() {
      assert.fileContent('mvcTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.csproj contains correct version', function() {
      assert.fileContent('mvcTest/mvcTest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * yo aspnet Web Application (Semantic UI)
 */
describe('aspnet - Web Application (Semantic UI)', function() {

  util.goCreateApplicationWithOptions('mvc', 'mvcTest', 'semantic', {});

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('mvcTest/');
    });

    it('Controllers directory created', function() {
      assert.file('mvcTest/Controllers');
    });

    it('Data directory created', function() {
      assert.file('mvcTest/Data');
    });

    it('Migrations directory created', function() {
      assert.file('mvcTest/Data/Migrations');
    });

    it('Models directory created', function() {
      assert.file('mvcTest/Models');
    });

    it('AccountViewModels directory created', function() {
      assert.file('mvcTest/Models/AccountViewModels');
    });

    it('Properties directory created', function() {
      assert.file('mvcTest/Properties');
    });

    it('Services directory created', function() {
      assert.file('mvcTest/Services');
    });

    it('Services directory created', function() {
      assert.file('mvcTest/TagHelpers');
    });

    it('Views directory created', function() {
      assert.file('mvcTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('mvcTest/Views/Home');
    });

    it('Views/Manage directory created', function() {
      assert.file('mvcTest/Views/Manage');
    });

    it('Views/Shared directory created', function() {
      assert.file('mvcTest/Views/Shared');
    });

    it('wwwroot directory created', function() {
      assert.file('mvcTest/wwwroot');
    });

    it('wwwroot/css directory created', function() {
      assert.file('mvcTest/wwwroot/css');
    });

    it('wwwroot/images directory created', function() {
      assert.file('mvcTest/wwwroot/images');
    });

    it('wwwroot/js directory created', function() {
      assert.file('mvcTest/wwwroot/js');
    });

  });


  var files = [
    'mvcTest/.bowerrc',
    'mvcTest/.gitignore',
    'mvcTest/appsettings.json',
    'mvcTest/bower.json',
    'mvcTest/bundleconfig.json',
    'mvcTest/Controllers/AccountController.cs',
    'mvcTest/Controllers/HomeController.cs',
    'mvcTest/Controllers/ManageController.cs',
    'mvcTest/Data//ApplicationDbContext.cs',
    'mvcTest/Data/Migrations/00000000000000_CreateIdentitySchema.cs',
    'mvcTest/Data/Migrations/00000000000000_CreateIdentitySchema.Designer.cs',
    'mvcTest/Data/Migrations/ApplicationDbContextModelSnapshot.cs',
    'mvcTest/global.json',
    'mvcTest/Models/AccountViewModels/ExternalLoginConfirmationViewModel.cs',
    'mvcTest/Models/AccountViewModels/ForgotPasswordViewModel.cs',
    'mvcTest/Models/AccountViewModels/RegisterViewModel.cs',
    'mvcTest/Models/AccountViewModels/ResetPasswordViewModel.cs',
    'mvcTest/Models/AccountViewModels/SendCodeViewModel.cs',
    'mvcTest/Models/AccountViewModels/VerifyCodeViewModel.cs',
    'mvcTest/Models/ApplicationUser.cs',
    'mvcTest/Models/ManageViewModels/AddPhoneNumberViewModel.cs',
    'mvcTest/Models/ManageViewModels/ChangePasswordViewModel.cs',
    'mvcTest/Models/ManageViewModels/ConfigureTwoFactorViewModel.cs',
    'mvcTest/Models/ManageViewModels/FactorViewModel.cs',
    'mvcTest/Models/ManageViewModels/IndexViewModel.cs',
    'mvcTest/Models/ManageViewModels/ManageLoginsViewModel.cs',
    'mvcTest/Models/ManageViewModels/SetPasswordViewModel.cs',
    'mvcTest/Models/ManageViewModels/VerifyPhoneNumberViewModel.cs',
    'mvcTest/mvcTest.csproj',
    'mvcTest/mvcTest.db',
    'mvcTest/Program.cs',
    'mvcTest/Properties/launchSettings.json',
    'mvcTest/README.md',
    'mvcTest/Services/IEmailSender.cs',
    'mvcTest/Services/ISmsSender.cs',
    'mvcTest/Services/MessageServices.cs',
    'mvcTest/Startup.cs',
    'mvcTest/Views/_ViewImports.cshtml',
    'mvcTest/Views/_ViewStart.cshtml',
    'mvcTest/Views/Account/ConfirmEmail.cshtml',
    'mvcTest/Views/Account/ExternalLoginConfirmation.cshtml',
    'mvcTest/Views/Account/ExternalLoginFailure.cshtml',
    'mvcTest/Views/Account/ForgotPassword.cshtml',
    'mvcTest/Views/Account/ForgotPasswordConfirmation.cshtml',
    'mvcTest/Views/Account/Lockout.cshtml',
    'mvcTest/Views/Account/Login.cshtml',
    'mvcTest/Views/Account/Register.cshtml',
    'mvcTest/Views/Account/ResetPassword.cshtml',
    'mvcTest/Views/Account/ResetPasswordConfirmation.cshtml',
    'mvcTest/Views/Account/SendCode.cshtml',
    'mvcTest/Views/Account/VerifyCode.cshtml',
    'mvcTest/Views/Home/About.cshtml',
    'mvcTest/Views/Home/Contact.cshtml',
    'mvcTest/Views/Home/Index.cshtml',
    'mvcTest/Views/Manage/AddPhoneNumber.cshtml',
    'mvcTest/Views/Manage/ChangePassword.cshtml',
    'mvcTest/Views/Manage/Index.cshtml',
    'mvcTest/Views/Manage/ManageLogins.cshtml',
    'mvcTest/Views/Manage/SetPassword.cshtml',
    'mvcTest/Views/Manage/VerifyPhoneNumber.cshtml',
    'mvcTest/Views/Shared/_Layout.cshtml',
    'mvcTest/Views/Shared/_LoginPartial.cshtml',
    'mvcTest/Views/Shared/_ValidationScriptsPartial.cshtml',
    'mvcTest/Views/Shared/Error.cshtml',
    'mvcTest/web.config',
    'mvcTest/wwwroot/css/site.css',
    'mvcTest/wwwroot/css/site.min.css',
    'mvcTest/wwwroot/favicon.ico',
    'mvcTest/wwwroot/images/banner1.svg',
    'mvcTest/wwwroot/images/banner2.svg',
    'mvcTest/wwwroot/images/banner3.svg',
    'mvcTest/wwwroot/images/banner4.svg',
    'mvcTest/wwwroot/js/semantic.validation.js',
    'mvcTest/wwwroot/js/semantic.validation.min.js',
    'mvcTest/wwwroot/js/site.js',
    'mvcTest/wwwroot/js/site.min.js',
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('mvcTest/bower.json', /"name": "mvctest"/);
    });

    it('global.json contains correct version', function() {
      assert.fileContent('mvcTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.csproj contains correct version', function() {
      assert.fileContent('mvcTest/mvcTest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });


  describe('Checking file content for overrides', function() {

    it('_Layout.cshtml contains menulink tags', function() {
      assert.fileContent('mvcTest/Views/Shared/_Layout.cshtml', "menulink");
    });

    it('_ViewImports.cshtml contains TagHelper', function() {
      assert.fileContent('mvcTest/Views/_ViewImports.cshtml', '*, mvcTest');
    });

    it('_ValidationScriptsPartial.cshtml contains reference to semantic.validation.js', function() {
      assert.fileContent('mvcTest/Views/Shared/_ValidationScriptsPartial.cshtml', 'semantic.validation.js');
    });

    it('site.css is overridden', function() {
      assert.fileContent('mvcTest/wwwroot/css/site.css', '.masthead');
    });

    it('site.js is overridden', function() {
      assert.fileContent('mvcTest/wwwroot/js/site.js', '.sidebar(');
    });

    //We wont explicitly check every single file in every directory, one file per directory should suffice

    it('Views/Account/ConfirmEmail.cshtml contains Semantic UI markup', function() {
      assert.fileContent('mvcTest/Views/Account/ConfirmEmail.cshtml', 'ui header');
    });

    it('Views/Home/About.cshtml contains Semantic UI markup', function() {
      assert.fileContent('mvcTest/Views/Home/About.cshtml', 'ui container');
    });

    it('Views/Manage/AddPhoneNumber.cshtml contains Semantic UI markup', function() {
      assert.fileContent('mvcTest/Views/Manage/AddPhoneNumber.cshtml', 'ui header');
    });

    it('Views/Shared/Error.cshtml contains Semantic UI markup', function() {
      assert.fileContent('mvcTest/Views/Shared/Error.cshtml', 'ui header');
    });

    it('bower.json contains semantic references', function() {
      assert.fileContent('mvcTest/bower.json', 'semantic');
    });
  });

});

/*
 * yo aspnet Web Application (Bootstrap)
 */
describe('aspnet - Web Application Basic (Bootstrap)', function() {

  util.goCreateApplication('mvcbasic', 'webTest');

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
    'webTest/.bowerrc',
    'webTest/.gitignore',
    'webTest/appsettings.json',
    'webTest/appsettings.Development.json',
    'webTest/bower.json',
    'webTest/bundleconfig.json',
    'webTest/Controllers/HomeController.cs',
    'webTest/Program.cs',
    'webTest/webTest.csproj',
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
    'webTest/web.config',
    'webTest/wwwroot/css/site.css',
    'webTest/wwwroot/css/site.min.css',
    'webTest/wwwroot/favicon.ico',
    'webTest/wwwroot/images/banner1.svg',
    'webTest/wwwroot/images/banner2.svg',
    'webTest/wwwroot/images/banner3.svg',
    'webTest/wwwroot/images/banner4.svg',
    'webTest/wwwroot/js/site.js',
    'webTest/wwwroot/js/site.min.js',
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

  util.goCreateApplicationWithOptions('mvcbasic', 'webTest', 'semantic', {});

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
    'webTest/.bowerrc',
    'webTest/.gitignore',
    'webTest/appsettings.json',
    'webTest/appsettings.Development.json',
    'webTest/bower.json',
    'webTest/Controllers/HomeController.cs',
    'webTest/global.json',
    'webTest/Program.cs',
    'webTest/webTest.csproj',
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
    'webTest/web.config',
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
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('webTest/bower.json', /"name": "webtest"/);
    });

    it('global.json contains correct version', function() {
      assert.fileContent('webTest/global.json', /1.0.0-rc4-004771/);
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

  });


  var files = [
    'webAPITest/.gitignore',
    'webAPITest/appsettings.json',
    'webAPITest/appsettings.Development.json',
    'webAPITest/Controllers/ValuesController.cs',
    'webAPITest/global.json',
    'webAPITest/Program.cs',
    'webAPITest/webAPITest.csproj',
    'webAPITest/Properties/launchSettings.json',
    'webAPITest/README.md',
    'webAPITest/Startup.cs',
    'webAPITest/web.config',
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('webAPITest/global.json', /1.0.0-rc4-004771/);
    });

    it('.fsproj contains correct version', function() {
      assert.fileContent('webAPITest/webAPITest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

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

  var files = [
    'nancyTest/.gitignore',
    'nancyTest/HomeModule.cs',
    'nancyTest/Program.cs',
    'nancyTest/Startup.cs',
    'nancyTest/nancyTest.csproj'
  ];
  describe('Checking files', function () {

    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('.csproj contains correct version', function() {
      assert.fileContent('nancyTest/nancyTest.csproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });



});


/*
 * yo aspnet FSharp Class Library
 */
describe('FSharp Class Library', function() {

  util.goCreateApplication('fsharp_classlib', 'fsharpLibTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('fsharpLibTest/');
    });
  });

  var files = ['fsharpLibTest/global.json', 'fsharpLibTest/fsharpLibTest.fsproj', 'fsharpLibTest/Library.fs', 'fsharpLibTest/.gitignore'];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('fsharpLibTest/global.json', /1.0.0-rc4-004771/);
    });

  });

});


/*
 * yo aspnet FSharp Console Application
 */
describe('FSharp Console Application', function() {

  util.goCreateApplication('fsharp_console', 'fsharpConsoleTest');

  describe('Checking directories', function() {
    it('Application directory created', function() {
      assert.file('fsharpConsoleTest/');
    });
  });

  var files = [
    'fsharpConsoleTest/.gitignore',
    'fsharpConsoleTest/Program.fs',
    'fsharpConsoleTest/global.json',
    'fsharpConsoleTest/fsharpConsoleTest.fsproj'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('fsharpConsoleTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.fsproj contains correct version', function() {
      assert.fileContent('fsharpConsoleTest/fsharpConsoleTest.fsproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });
});

/*
 * F# xUnit Test Application
 */
describe('F# xUnit Test Application', function() {

  util.goCreateApplication('fsharp_xunit', 'fsharpTest');

  describe('Checking directories', function() {
    it('Project directory created', function() {
      assert.file('fsharpTest/');
    });
  });

  var files = [
    'fsharpTest/.gitignore',
    'fsharpTest/global.json',
    'fsharpTest/fsharpTest.fsproj',
    'fsharpTest/Tests.fs',
    'fsharpTest/xunit.runner.json'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('fsharpTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.fsproj contains correct version', function() {
      assert.fileContent('fsharpTest/fsharpTest.fsproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });
});

/*
 * F# MSTest Unit Test
 */
describe('F# MSTest Unit Test', function() {

  util.goCreateApplication('fsharp_mstest', 'fsharpMSTest');

  describe('Checking directories', function() {
    it('Project directory created', function() {
      assert.file('fsharpMSTest/');
    });
  });

  var files = [
    'fsharpMSTest/.gitignore',
    'fsharpMSTest/global.json',
    'fsharpMSTest/fsharpMSTest.fsproj',
    'fsharpMSTest/Tests.fs',
    'fsharpMSTest/xunit.runner.json'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('fsharpMSTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.fsproj contains correct version', function() {
      assert.fileContent('fsharpMSTest/fsharpMSTest.fsproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  })

});


/*
 * yo aspnet FSharp Empty Application
 */
describe('aspnet - F# Empty Web Application', function() {

  util.goCreateApplication('fsharp_web', 'fsharpEmptyWebTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('fsharpEmptyWebTest/');
    });

    it('Properties directory created', function() {
      assert.file('fsharpEmptyWebTest/Properties');
    });

    it('wwwroot directory created', function() {
      assert.file('fsharpEmptyWebTest/wwwroot');
    });

  });

  var files = [
    'fsharpEmptyWebTest/.gitignore',
    'fsharpEmptyWebTest/global.json',
    'fsharpEmptyWebTest/Program.fs',
    'fsharpEmptyWebTest/fsharpEmptyWebTest.fsproj',
    'fsharpEmptyWebTest/Properties/launchSettings.json',
    'fsharpEmptyWebTest/README.md',
    'fsharpEmptyWebTest/runtimeconfig.template.json',
    'fsharpEmptyWebTest/Startup.fs',
    'fsharpEmptyWebTest/web.config'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('fsharpEmptyWebTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.fsproj contains correct version', function() {
      assert.fileContent('fsharpEmptyWebTest/fsharpEmptyWebTest.fsproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * yo aspnet Web API Application
 */
describe('aspnet - Fsharp Web API Application', function() {

  util.goCreateApplication('fsharp_webapi', 'fsharpWebAPITest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('fsharpWebAPITest/');
    });

    it('Properties directory created', function() {
      assert.file('fsharpWebAPITest/Properties');
    });

    it('Controllers directory created', function() {
      assert.file('fsharpWebAPITest/Controllers');
    });
  });


  var files = [
    'fsharpWebAPITest/.gitignore',
    'fsharpWebAPITest/appsettings.json',
    'fsharpWebAPITest/appsettings.Development.json',
    'fsharpWebAPITest/Controllers/ValuesController.fs',
    'fsharpWebAPITest/global.json',
    'fsharpWebAPITest/Program.fs',
    'fsharpWebAPITest/fsharpWebAPITest.fsproj',
    'fsharpWebAPITest/Properties/launchSettings.json',
    'fsharpWebAPITest/README.md',
    'fsharpWebAPITest/runtimeconfig.template.json',
    'fsharpWebAPITest/Startup.fs',
    'fsharpWebAPITest/web.config'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('global.json contains correct version', function() {
      assert.fileContent('fsharpWebAPITest/global.json', /1.0.0-rc4-004771/);
    });

    it('.fsproj contains correct version', function() {
      assert.fileContent('fsharpWebAPITest/fsharpWebAPITest.fsproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * yo aspnet FSharp Web Application Basic
 */
describe('aspnet - FSharp Web Application Basic', function() {

  util.goCreateApplication('fsharp_mvcbasic', 'fsharpMvcBasicTest');

  describe('Checking directories', function() {

    it('Application directory created', function() {
      assert.file('fsharpMvcBasicTest/');
    });

    it('Properties directory created', function() {
      assert.file('fsharpMvcBasicTest/Properties');
    });

    it('Controllers directory created', function() {
      assert.file('fsharpMvcBasicTest/Controllers');
    });

    it('Views directory created', function() {
      assert.file('fsharpMvcBasicTest/Views');
    });

    it('Views/Home directory created', function() {
      assert.file('fsharpMvcBasicTest/Views/Home');
    });

    it('Views/Shared directory created', function() {
      assert.file('fsharpMvcBasicTest/Views/Shared');
    });

    it('wwwroot directory created', function() {
      assert.file('fsharpMvcBasicTest/wwwroot');
    });

    it('wwwroot/css directory created', function() {
      assert.file('fsharpMvcBasicTest/wwwroot/css');
    });

    it('wwwroot/images directory created', function() {
      assert.file('fsharpMvcBasicTest/wwwroot/images');
    });

    it('wwwroot/js directory created', function() {
      assert.file('fsharpMvcBasicTest/wwwroot/js');
    });

  });

  var files = [
    'fsharpMvcBasicTest/.bowerrc',
    'fsharpMvcBasicTest/.gitignore',
    'fsharpMvcBasicTest/Controllers/HomeController.fs',
    'fsharpMvcBasicTest/Program.fs',
    'fsharpMvcBasicTest/Properties/launchSettings.json',
    'fsharpMvcBasicTest/README.md',
    'fsharpMvcBasicTest/Startup.fs',
    'fsharpMvcBasicTest/Views/Home/About.cshtml',
    'fsharpMvcBasicTest/Views/Home/Contact.cshtml',
    'fsharpMvcBasicTest/Views/Home/Index.cshtml',
    'fsharpMvcBasicTest/Views/Shared/Error.cshtml',
    'fsharpMvcBasicTest/Views/Shared/_Layout.cshtml',
    'fsharpMvcBasicTest/Views/Shared/_ValidationScriptsPartial.cshtml',
    'fsharpMvcBasicTest/Views/_ViewImports.cshtml',
    'fsharpMvcBasicTest/Views/_ViewStart.cshtml',
    'fsharpMvcBasicTest/appsettings.Development.json',
    'fsharpMvcBasicTest/appsettings.json',
    'fsharpMvcBasicTest/bower.json',
    'fsharpMvcBasicTest/bundleconfig.json',
    'fsharpMvcBasicTest/fsharpMvcBasicTest.fsproj',
    'fsharpMvcBasicTest/global.json',
    'fsharpMvcBasicTest/web.config',
    'fsharpMvcBasicTest/wwwroot/css/site.css',
    'fsharpMvcBasicTest/wwwroot/css/site.min.css',
    'fsharpMvcBasicTest/wwwroot/favicon.ico',
    'fsharpMvcBasicTest/wwwroot/images/banner1.svg',
    'fsharpMvcBasicTest/wwwroot/images/banner2.svg',
    'fsharpMvcBasicTest/wwwroot/images/banner3.svg',
    'fsharpMvcBasicTest/wwwroot/images/banner4.svg',
    'fsharpMvcBasicTest/wwwroot/js/site.js',
    'fsharpMvcBasicTest/wwwroot/js/site.min.js'
  ];
  describe('Checking files', function() {
    for (var i = 0; i < files.length; i++) {
      util.filesCheck(files[i]);
    }

    it('bower.json name field is lower case', function() {
      assert.fileContent('fsharpMvcBasicTest/bower.json', /"name": "fsharpmvcbasictest"/);
    });

    it('global.json contains correct version', function() {
      assert.fileContent('fsharpMvcBasicTest/global.json', /1.0.0-rc4-004771/);
    });

    it('.fsproj contains correct version', function() {
      assert.fileContent('fsharpMvcBasicTest/fsharpMvcBasicTest.fsproj', /<TargetFramework\>netcoreapp1\.0<\/TargetFramework>/);
    });

  });

});

/*
 * command line options
 */
describe('command line options', function() {
  it('keeps project type and application name if passed correctly from CLI', function() {
    var app = require('../app');
    app.prototype.log = function() {}; //stub
    app.prototype.type = 'mvcbasic';
    app.prototype.applicationName = 'myWebApp';
    app.prototype.ui = 'bootstrap';

    app.prototype._checkProjectType();

    assert.equal('mvcbasic', app.prototype.type);
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
