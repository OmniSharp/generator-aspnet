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
- MSTest Test project (MSTest)
- xUnit Test project (xUnit.net)
- Unit Test project (MSTest) (F#)
- xUnit Test project (xUnit.net) (F#)

The Empty Web Application, Console Application, Web Application, Web Application Basic (a.k.a. Web Application No Auth), Web API Application and Class Library are based on the templates introduced with Visual Studio 2015. They are available and maintained in the [ASP.NET Templates project](https://github.com/aspnet/Templates).

> [ASP.NET Templates](https://github.com/aspnet/Templates) project provides templates which are used in Visual Studio for creating ASP.NET Core applications.

> NOTE: Starting from `RC2` `dotnet` release the web application template project no longer ships with built-in EF migration. For this reason you should call `dotnet ef database update` to scaffold database using template provided migrations!

The Nancy project is based on framework's "Hello World" template:
[Nancy Getting Started: Introduction](https://github.com/NancyFx/Nancy/wiki/Introduction)

The xUnit test project uses [xUnit: a free, open source, community-focused unit testing tool for the .NET Framework](https://xunit.github.io/)

The F# Templates are based on [Core F# Templates](https://github.com/odytrice/core-fsharp-templates) projects. They were translated into F# from the original [ASP.NET Templates](https://github.com/aspnet/Templates) 

The templates that use client-side libraries are calling the `bower install` script to install Bower managed dependencies. You can skip the installation process by passing the `--skip-install` option to the generator, e.g. `yo aspnet --skip-install`. This should allow for a better experience when `Development` has been enabled.

The templates support both `LTS` and `Current` version of runtime. The `LTS` version is enabled by default (or enforced by `--version-lts` option). You can switch to `Current` version at any time by passing `--version-current` option when invoking generator: `yo aspnet --version-current`.

## Command line automation

The project type and application name can be specified as optional command line arguments:

    yo aspnet [projecttype [applicationname] [uiframework]]

The valid project types are:

- `web` for Empty Web Application
- `console` for Console Application
- `mvc` for Web Application
- `mvcbasic` for Web Application Basic
- `webapi` for Web API Application
- `nancy` for Nancy ASP.NET Application
- `classlib` for Class Library
- `mstest` MSTest Test project (MSTest)
- `xunit` xUnit Test project (xUnit.net)
- `fsharp_web` for F# Empty Web Application
- `fsharp_console` for F# Console Application
- `fsharp_classlib` for F# Class Library
- `fsharp_webapi` for F# Web API Application
- `fsharp_mvcbasic` for F# Web Application Basic
- `fsharp_mstest` for F# Unit Test project (MSTest)
- `fsharp_xunit` for F# xUnit Test project (xUnit.net)

The valid UI framework types are:

- `bootstrap` for Bootstrap (this is the default and does not have to be specified explicitly)
- `semantic` for Semantic UI

> Example: `yo aspnet mvcbasic "my semantic app" semantic` will create a "Web Application Basic" project called "my semantic app" using the Semantic UI framework.

> Example: `yo aspnet mvcbasic "my bootstrap app"` OR `yo aspnet mvcbasic "my bootstrap app" bootstrap` will create a "Web Application Basic" project called "my bootstrap app" using the Bootstrap framework.

## Related yeoman generators

The goal of `generator-aspnet` is to provide an experience consistent with creating new ASP.NET Core `dotnet cli` projects
and files in Visual Studio 2015.

The list of related generators [can be seen on our Wiki section](https://github.com/OmniSharp/generator-aspnet/wiki#related-yeoman-generators)

## Sub Generators

The alphabetic list of available sub generators (_to create files after the project has been created_):

* [aspnet:nugetconfig](#nugetconfig)
* [aspnet:webconfig](#webconfig)

** Note: files generated are created in the working directory, no conventions are forced **

[Return to top](#top)

### nugetconfig

Creates a new `NuGet.config` file.

Example:

```
yo aspnet:nugetconfig
```

Produces `NuGet.config`

[Return to top](#top)

### webconfig

Creates a new Web Config file

Example:

```
yo aspnet:webconfig
```

Produces `web.config`

[Return to top](#top)

## License

Copyright 2014-2016 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

[Return to top](#top)
