# generator-aspnet

[![Build Status](https://travis-ci.org/OmniSharp/generator-aspnet.svg?branch=master)](https://travis-ci.org/OmniSharp/generator-aspnet)
![Version](https://img.shields.io/npm/v/generator-aspnet.svg)
![Downloads per month](https://img.shields.io/npm/dm/generator-aspnet.svg)

> NOTE: The content has been updated for .NET Core 1.1.0 (`project.json` based). For more info see https://github.com/OmniSharp/generator-aspnet/wiki/Version-info

Yeoman generator for ASP.NET Core projects

[![](https://cloud.githubusercontent.com/assets/14539/16569731/0590dada-423a-11e6-997c-1e1e20b1d37e.gif)](https://github.com/OmniSharp/generator-aspnet 'ASP.NET Core Generator')

## Getting Started

- Dependencies:
    - Node.js: `brew install node` for Mac OS X, `choco install nodejs` for Windows OS
    - Yeoman: `npm install -g yo`
    - Bower `npm install -g bower`
- Install: `npm install -g generator-aspnet`
- Run: `yo aspnet`

See also: [Building Projects with Yeoman on docs.asp.net](https://docs.asp.net/en/latest/client-side/yeoman.html?#building-projects-with-yeoman)

> NOTE: Starting from RTM release `Web Application` and `Web Application Basic` project templates use [`Bundler Minifier`](https://www.nuget.org/packages/BundlerMinifier.Core/) tool instead of NPM based build systems like Gulp or Grunt. The Bundler tool is installed as part of tooling support for the project, the `project.json` contains relevant scripting integration and one can use that tool independently from console using its `CLI` interface. Visit [Bundler tool WIKI](https://git.io/vo9hw) for details.  
Also see [ASP NET Community Standup - June 21st, 2016 - Mads Visits](https://www.youtube.com/watch?v=p6NUkeTVsGE) for detailed information about this change introduction.

## Usage

* `yo aspnet` shows a wizard for generating a new ASP.NET Core app

* `yo aspnet --help` shows flags and other configurable options

## Template projects

Full, template based projects available in generator:

- Empty Web Application
- Empty Web Application (F#)
- Console Application
- Console Application (F#)
- Web Application
- Web Application Basic [without Membership and Authorization]
- Web Application Basic [without Membership and Authorization] \(F#)
- Web API Application
- Web API Application (F#)
- Nancy ASP.NET Application
- Class Library
- Class Library (F#)
- Unit Test project (xUnit.net)
- Unit Test project (xUnit.net) (F#)

The Empty Web Application, Console Application, Web Application, Web Application Basic (a.k.a. Web Application No Auth), Web API Application and Class Library are based on the templates introduced with Visual Studio 2015. They are available and maintained in the [ASP.NET Templates project](https://github.com/aspnet/Templates).

> [ASP.NET Templates](https://github.com/aspnet/Templates) project provides templates which are used in Visual Studio for creating ASP.NET Core applications.

> NOTE: Starting from `RC2` `dotnet` release the web application template project no longer ships with built-in EF migration. For this reason you should call `dotnet ef database update` to scaffold database using template provided migrations!

The Nancy project is based on framework's "Hello World" template:
[Nancy Getting Started: Introduction](https://github.com/NancyFx/Nancy/wiki/Introduction)

The [Docker](https://www.docker.com/) support with `Dockerfile` configuration files is based on the official [Docker image for ASP.NET Core](https://github.com/aspnet/aspnet-docker)

The Unit test project uses [xUnit: a free, open source, community-focused unit testing tool for the .NET Framework](https://xunit.github.io/)

The F# Templates are based on [Core F# Templates](https://github.com/odytrice/core-fsharp-templates) projects. They were translated into F# from the original [ASP.NET Templates](https://github.com/aspnet/Templates) 

The templates that use client-side libraries are calling the `bower install` script to install Bower managed dependencies. You can skip the installation process by passing the `--skip-install` option to the generator, e.g. `yo aspnet --skip-install`. This should allow for a better experience when `Development` has been enabled.

## Command line automation

The project type and application name can be specified as optional command line arguments:

    yo aspnet [projecttype [applicationname] [uiframework]]

The valid project types are:

- `emptyweb` for Empty Web Application
- `consoleapp` for Console Application
- `web` for Web Application
- `webbasic` for Web Application Basic
- `webapi` for Web API Application
- `nancy` for Nancy ASP.NET Application
- `classlibrary` for Class Library
- `unittest` Unit Test project (xUnit.net)
- `fsharp_emptyweb` for F# Empty Web Application
- `fsharp_console` for F# Console Application
- `fsharp_lib` for F# Class Library
- `fsharp_webapi` for F# Web API Application
- `fsharp_webbasic` for F# Web Application Basic
- `fsharp_test` for F# Unit Test project (xUnit.net)

The valid UI framework types are:

- `bootstrap` for Bootstrap (this is the default and does not have to be specified explicitly)
- `semantic` for Semantic UI

> Example: `yo aspnet webbasic "my semantic app" semantic` will create a "Web Application Basic" project called "my semantic app" using the Semantic UI framework.

> Example: `yo aspnet webbasic "my bootstrap app"` OR `yo aspnet webbasic "my bootstrap app" bootstrap` will create a "Web Application Basic" project called "my bootstrap app" using the Bootstrap framework.

## Related yeoman generators

The goal of `generator-aspnet` is to provide an experience consistent with creating new ASP.NET Core `dotnet cli` projects
and files in Visual Studio 2015.

The list of related generators [can be seen on our Wiki section](https://github.com/OmniSharp/generator-aspnet/wiki#related-yeoman-generators)

## Sub Generators

The alphabetic list of available sub generators (_to create files after the project has been created_):

* [aspnet:angularcontroller](#angularcontroller)
* [aspnet:angularcontrolleras](#angularcontrolleras)
* [aspnet:angulardirective](#angulardirective)
* [aspnet:angularfactory](#angularfactory)
* [aspnet:angularmodule](#angularmodule)
* [aspnet:appsettings](#appsettings)
* [aspnet:bowerjson](#bowerjson)
* [aspnet:class](#class)
* [aspnet:coffeescript](#coffeescript)
* [aspnet:dockerfile](#dockerfile)
* [aspnet:gitignore](#gitignore)
* [aspnet:gruntfile](#gruntfile)
* [aspnet:gulpfile](#gulpfile)
* [aspnet:htmlpage](#htmlpage)
* [aspnet:interface](#interface)
* [aspnet:javascript](#javascript)
* [aspnet:json](#json)
* [aspnet:jsonschema](#jsonschema)
* [aspnet:jsx](#jsx)
* [aspnet:middleware](#middleware)
* [aspnet:mvccontroller](#mvccontroller)
* [aspnet:mvcview](#mvcview)
* [aspnet:nuget](#nuget)
* [aspnet:packagejson](#packagejson)
* [aspnet:program](#program)
* [aspnet:readme](#readme)
* [aspnet:startup](#startup)
* [aspnet:stylesheet](#stylesheet)
* [aspnet:stylesheetless](#stylesheetless)
* [aspnet:stylesheetscss](#stylesheetscss)
* [aspnet:taghelper](#taghelper)
* [aspnet:textfile](#textfile)
* [aspnet:tfignore](#tfignore)
* [aspnet:typescript](#typescript)
* [aspnet:typescriptconfig](#typescriptconfig)
* [aspnet:typescriptjsx](#typescriptjsx)
* [aspnet:usersecrets](#usersecrets)
* [aspnet:webapicontroller](#webapicontroller)

** Note: files generated are created in the working directory, no conventions are forced **

[Return to top](#top)

### angularcontroller

Creates AngularJS controller file using $scope

Example:
```
yo aspnet:angularcontroller filename
```

Produces `filename.js`

[Return to top](#top)

### angularcontrolleras

Creates AngularJS controller file using `Controller As` syntax.

Example:
```
yo aspnet:angularcontrolleras filename
```

Produces `filename.js`

[Return to top](#top)

### angulardirective

Creates AngularJS directive file.

Example:
```
yo aspnet:angulardirective filename
```

Produces `filename.js`

[Return to top](#top)

### angularfactory

Creates AngularJS factory file.

Example:
```
yo aspnet:angularfactory filename
```

Produces `filename.js`

[Return to top](#top)

### angularmodule

Creates AngularJS module file

Example:
```
yo aspnet:angularmodule filename
```

Produces `filename.js`

[Return to top](#top)

### appsettings

Creates a new appsettings.json file

Example:

```
yo aspnet:appsettings
```

Produces `appsettings.json`

[Return to top](#top)

### bowerjson

Creates a new `bower.json` and configuration file.

Example:

```
yo aspnet:bowerjson
```

Produces `bower.json` and `.bowerrc`

[Return to top](#top)

### class

Creates a new ASP.NET Core class

Example:

```
yo aspnet:class Contact
```

Produces `/Contact.cs`

[Return to top](#top)

### coffeescript

Creates a new CoffeeScript file

Example:

```
yo aspnet:coffeescript filename
```

Produces `filename.coffee`

[Return to top](#top)

### dockerfile

Creates a new Docker configuration file.
To create Docker image with SQLite support for EntityFramework use `--sqlite` option

Example:
```
yo aspnet:dockerfile
```

Creates a new `Dockerfile`

Are you curious about Docker, Linux containers and ASP.NET Core Docker image and all these buzz words?
- [Docker image for ASP.NET 5 (Docker Hub)](https://hub.docker.com/r/microsoft/aspnet/)
- [Running ASP.NET 5 applications in Linux Containers with Docker (MSDN)](http://blogs.msdn.com/b/webdev/archive/2015/01/14/running-asp-net-5-applications-in-linux-containers-with-docker.aspx)
- [ASP.NET 5 : Continuous Integration with Travis-CI, Tutum, Docker, Webhooks and Azure [Advanced]](http://tattoocoder.com/asp-net-5-continuous-integration-with-travis-ci-tutum-docker-webhooks-and-azure/)
- [ASP.NET 5 on Docker talk at NDC {London}](https://vimeo.com/154588594) by [Mark Rendle](https://twitter.com/markrendle)

[Return to top](#top)

### gitignore

Creates a new .gitignore file

Example:

```
yo aspnet:gitignore
```

Produces `.gitignore`

[Return to top](#top)

### gruntfile

Creates a new `Grunt` file

Example:

```
yo aspnet:gruntfile
```

Produces `Gruntfile.js`

[Return to top](#top)

### gulpfile

Creates a new Gulp file

Example:

```
yo aspnet:gulpfile
```

Produces `gulpfile.js`

[Return to top](#top)

### htmlpage

Creates a new HTML file

Example:

```
yo aspnet:htmlpage filename
```

Produces `filename.html`

[Return to top](#top)

### interface

Creates a new ASP.NET Core interface

Example:

```
yo aspnet:interface IContact
```

Produces `/IContact.cs`

[Return to top](#top)

### javascript

Creates a new JavaScript file

Example:

```
yo aspnet:javascript filename
```

Produces `filename.js`

[Return to top](#top)

### json

Creates a new JSON file

Example:

```
yo aspnet:json filename
```

Produces `filename.json`

[Return to top](#top)

### jsonschema

Creates a new JSON schema file

Example:

```
yo aspnet:jsonschema filename
```

Produces `filename.json`

[Return to top](#top)

### jsx

Creates a new React JSX file

Example:

```
yo aspnet:jsx filename
```

Produces `filename.jsx`

[Return to top](#top)

### middleware

Creates a new C# middleware class file

Example:

```
yo aspnet:middleware filename
```

Produces `filename.cs`

[Return to top](#top)

### mvccontroller

Creates a new ASP.NET Core MvcController class

Example:

```
yo aspnet:mvccontroller ContactController
```

Produces `/ContactController.cs`

[Read more about MVC Controllers on docs.asp.net](https://docs.asp.net/en/latest/mvc/controllers/index.html)

[Return to top](#top)

### mvcview

Creates a new ASP.NET Core MvcView page file

Example:

```
yo aspnet:mvcview ContactView
```

Produces `/ContactView.cshtml`

[Read more about MVC Views on docs.asp.net](https://docs.asp.net/en/latest/mvc/views/index.html?#views)

[Return to top](#top)

### nuget

Creates a new `NuGet.config` file. The support for unstable development
feed is provided by `--unstable` option.

Example:

```
yo aspnet:nuget --unstable
```

Produces `NuGet.config` with unstable NuGet feed

[Return to top](#top)

### packagejson

Creates a new package.json file

Example:

```
yo aspnet:packagejson
```

Produces `package.json`

[Return to top](#top)

### program

Creates a new `Program.cs` file

Example:

```
yo aspnet:program
```

Produces `Program.cs`

[Return to top](#top)

### README

Creates a new REAMDE.md documentation file in Markdown format
You can optionally pass `--txt` option to use `.txt` extension.
Example:

```
yo aspnet:readme [--txt]
```

Produces `readme.md`

[Return to top](#top)

### startup

Creates a new `Startup.cs` file

Example:

```
yo aspnet:startup
```

Produces `Startup.cs`

[Return to top](#top)

### stylesheet

Creates a new CSS file

Example:

```
yo aspnet:stylesheet style
```

Produces `style.css`

[Return to top](#top)

### stylesheetless

Creates a new Less class file

Example:

```
yo aspnet:stylesheetless filename
```

Produces `filename.less`

[Return to top](#top)

### stylesheetscss

Creates a new Sass SCSS class file

Example:

```
yo aspnet:stylesheetscss filename
```

Produces `filename.scss`

[Return to top](#top)

### taghelper

Creates a new TagHelper class file

Example:

```
yo aspnet:taghelper filename
```

Produces `filename.cs`

[Return to top](#top)

### textfile

Creates a new Text file

Example:

```
yo aspnet:textfile filename
```

Produces `filename.txt`

[Return to top](#top)

### tfignore

Creates a new .tfignore file

Example:

```
yo aspnet:tfignore
```

Produces `.tfignore`

[Return to top](#top)

### typescript

Creates a new TypeScript file

Example:

```
yo aspnet:typescript filename
```

Produces `filename.ts`

[Return to top](#top)

### typescriptconfig

Creates a new TypeScript configuration file

Example:

```
yo aspnet:typescriptconfig
```

Produces `tsconfig.json`

[Return to top](#top)

### typescriptjsx

Creates a new JSX-enabled TypeScript file

Example:

```
yo aspnet:typescriptjsx filename
```

Produces `filename.tsx`

[Return to top](#top)

### usersecrets

Adds UserSecrets information to ASP.NET Core `project.json` file.
The generator do not update existing keys if found and does
not create new `project.json` file.

Example:

```
yo aspnet:usersecrets
```

This will add following keys to project.json:
- "userSecretsId" key
- "Microsoft.Extensions.Configuration.UserSecrets" key under "dependencies"

[Return to top](#top)

### webapicontroller

Creates a new ASP.NET Core WebApiController class

Example:

```
yo aspnet:webapicontroller ValuesController
```

Produces `/ValuesController.cs`

[Read more about Web API MVC concepts on docs.asp.net](https://docs.asp.net/en/latest/tutorials/first-web-api.html)

[Return to top](#top)

## License

Copyright 2014-2016 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

[Return to top](#top)
