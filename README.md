# generator-aspnet

[![Join the chat at https://gitter.im/jackjwilliams/generator-aspnet-semanticui](https://badges.gitter.im/jackjwilliams/generator-aspnet-semanticui.svg)](https://gitter.im/jackjwilliams/generator-aspnet-semanticui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/OmniSharp/generator-aspnet.svg?branch=master)](https://travis-ci.org/OmniSharp/generator-aspnet)
![Version](https://img.shields.io/npm/v/generator-aspnet.svg)
![Downloads per month](https://img.shields.io/npm/dm/generator-aspnet.svg)

Yeoman generator for ASP.NET 5 projects with Semantic UI

[![](https://cloud.githubusercontent.com/assets/14539/10418056/b72ae284-7050-11e5-99db-5a0cda8f0ac1.gif)](https://github.com/OmniSharp/generator-aspnet 'ASP.NET 5 Generator')

## Getting Started

- Dependencies:
    - Node.js: `brew install node` for Mac OS X, `choco install nodejs` for Windows OS
    - Yeoman: `npm install -g yo`
- Install: `npm install -g generator-aspnet`
- Run: `yo aspnet`

## Usage

* `yo aspnet` shows a wizard for generating a new ASP.NET app

* `yo aspnet --grunt` generates `Gruntfile.js` files for **web** templates instead of `gulpfile.js`

* `yo aspnet --help` shows flags and other configurable options

## Template projects

Full, template based projects available in generator:

- Empty Application
- Console Application
- Web Application
- Web Application Basic [without Membership and Authorization]
- Web API Application
- Nancy ASP.NET Application
- Class Library
- Unit Test project

The Empty Application, Console Application, Web Application, Web Application Basic (a.k.a. Web Application No Auth), Web API Application and Class Library are based on the templates introduced with Visual Studio 2015. They are available and maintained in the [ASP.NET Templates project](https://github.com/aspnet/Templates).

> ASP.NET Templates provide project templates which are used in Visual Studio for creating ASP.NET 5 applications.

The Nancy project is based on framework's "Hello World" template:
[Nancy Getting Started: Introduction](https://github.com/NancyFx/Nancy/wiki/Introduction)

The [Docker](https://www.docker.com/) support with `Dockerfile` configuration files is based on the official [Docker image for ASP.NET 5](https://github.com/aspnet/aspnet-docker)

## Command line automation

The project type and application name can be specified as optional command line arguments:

    yo aspnet [projecttype [applicationname] [uiframework]]

The valid project types are:

- `empty` for Empty Application
- `console` for Console Application
- `web` for Web Application
- `webbasic` for Web Application Basic
- `webapi` for Web API Application
- `nancy` for Nancy ASP.NET Application
- `classlib` for Class Library
- `unittest` Unit Test project

The valid UI framework types are:

- `bootstrap` for Bootstrap (this is the default and does not have to be specified explicitly)
- `semantic` for Semantic UI

> Example: `yo aspnet webbasic "my semantic app" semantic` will create a "Web Application Basic" project called "my semantic app" using the Semantic UI framework.

> Example: `yo aspnet webbasic "my bootstrap app"` OR `yo aspnet webbasic "my bootstrap app" bootstrap` will create a "Web Application Basic" project called "my bootstrap app" using the Bootstrap framework.

## Additional UI Framework Notes

## Semantic UI

### CSS / JS
This generator uses the Semantic UI bower package. By default it includes the entire Semantic UI .css or .min.css
depending on the environment. You can read the Semantic UI documentation [here](http://semantic-ui.com/introduction/build-tools.html) to learn how to use just the components you need.

### Validation
In order for Semantic UI validation to play nicely with the jQuery unobtrusive validation, a helper has been added to 
hook into the validation calls and update the fields. This module simply highlights the field, and displays a 
validation summary.

For a form to be validated, add the `validate-me` class. To display the error messages use:

`<div asp-validation-summary="ValidationSummary.All" class="ui error message"></div>`

semantic.validation.js is where the magic happens. Upon error (highlight), find the nearest field element and add the error class.
When the error is cleared (unhighlight), remove the error class from the nearest field element.

### MenuLinkTagHelper
To assist with menu highlighting depending on the route, a MenuLinkTagHelper class has been included.


## Related yeoman generators

The goal of `generator-aspnet` is to provide an experience consistent with creating new ASP.NET 5 (_DNX_) projects
and files in Visual Studio 2015.

The list of related generators [can be seen on our Wiki section](https://github.com/OmniSharp/generator-aspnet/wiki#related-yeoman-generators)

## Sub Generators

The alphabetic list of available sub generators (_to create files after the project has been created_):

* [aspnet:AngularController](#angularcontroller)
* [aspnet:AngularControllerAs](#angularcontrolleras)
* [aspnet:AngularDirective](#angulardirective)
* [aspnet:AngularFactory](#angularfactory)
* [aspnet:AngularModule](#angularmodule)
* [aspnet:AppSettings](#appsettings)
* [aspnet:BowerJson](#bowerjson)
* [aspnet:Class](#class)
* [aspnet:CoffeeScript](#coffeescript)
* [aspnet:Dockerfile](#dockerfile)
* [aspnet:gitignore](#gitignore)
* [aspnet:Gruntfile](#gruntfile)
* [aspnet:Gulpfile](#gulpfile)
* [aspnet:HTMLPage](#htmlpage)
* [aspnet:Interface](#interface)
* [aspnet:JavaScript](#javascript)
* [aspnet:JScript](#jscript)
* [aspnet:JSON](#json)
* [aspnet:JSONSchema](#jsonschema)
* [aspnet:JSX](#jsx)
* [aspnet:Middleware](#middleware)
* [aspnet:MvcController](#mvccontroller)
* [aspnet:MvcView](#mvcview)
* [aspnet:nuget](#nuget)
* [aspnet:PackageJson](#packagejson)
* [aspnet:readme](#readme)
* [aspnet:StartupClass](#startupclass)
* [aspnet:StyleSheet](#stylesheet)
* [aspnet:StyleSheetLess](#stylesheetless)
* [aspnet:StyleSheetScss](#stylesheetscss)
* [aspnet:TagHelper](#taghelper)
* [aspnet:TextFile](#textfile)
* [aspnet:tfignore](#tfignore)
* [aspnet:TypeScript](#typescript)
* [aspnet:TypeScriptConfig](#typescriptconfig)
* [aspnet:TypeScriptJSX](#typescriptjsx)
* [aspnet:UserSecrets](#usersecrets)
* [aspnet:WebApiContoller](#webapicontroller)

** Note: files generated are created in the working directory, no conventions are forced **

[Return to top](#top)

### AngularController

Creates AngularJS controller file using $scope

Example:
```
yo aspnet:AngularController filename
```

Produces `filename.js`

[Return to top](#top)

### AngularControllerAs

Creates AngularJS controller file using `Controller As` syntax.

Example:
```
yo aspnet:AngularControllerAs filename
```

Produces `filename.js`

[Return to top](#top)

### AngularDirective

Creates AngularJS directive file.

Example:
```
yo aspnet:AngularDirective filename
```

Produces `filename.js`

[Return to top](#top)

### AngularFactory

Creates AngularJS factory file.

Example:
```
yo aspnet:AngularFactory filename
```

Produces `filename.js`

[Return to top](#top)

### AngularModule

Creates AngularJS module file

Example:
```
yo aspnet:AngularModule filename
```

Produces `filename.js`

[Return to top](#top)

### AppSettings

Creates a new appsettings.json file

Example:

```
yo aspnet:AppSettings
```

Produces `appsettings.json`

[Return to top](#top)

### BowerJson

Creates a new `bower.json` and configuration file.

Example:

```
yo aspnet:BowerJson
```

Produces `bower.json` and `.bowerrc`

[Return to top](#top)

### Class

Creates a new ASP.NET 5 Class

Example:

```
yo aspnet:Class Contact
```

Produces `/Contact.cs`

```cs
using System;

namespace MyNamespace
{
    public class Contact
    {

    }
}
```

[Return to top](#top)

### CoffeeScript

Creates a new CoffeeScript file

Example:

```
yo aspnet:CoffeeScript filename
```

Produces `filename.coffee`

[Return to top](#top)

### Dockerfile

Creates a new Docker configuration file.
By default `Mono` based definition file is created.
To create `CoreCLR` based definition file use `--coreclr` option

Example:
```
yo aspnet:Dockerfile
```

Creates a new `Dockerfile`

Are you curious about Docker, Linux containers and ASP.NET 5 Docker image and all these buzz words?
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

### Gruntfile

Creates a new `Grunt` file

Example:

```
yo aspnet:Gruntfile
```

Produces `Gruntfile.js`

[Return to top](#top)

### Gulpfile

Creates a new Gulp file

Example:

```
yo aspnet:Gulpfile
```

Produces `gulpfile.js`

[Return to top](#top)

### HTMLPage

Creates a new HTML file

Example:

```
yo aspnet:HTMLPage filename
```

Produces `filename.html`

[Return to top](#top)

### Interface

Creates a new ASP.NET 5 Interface

Example:

```
yo aspnet:Interface IContact
```

Produces `/IContact.cs`

[Return to top](#top)

### JavaScript

Creates a new JavaScript file

Example:

```
yo aspnet:JavaScript filename
```

Produces `filename.js`

[Return to top](#top)

### JScript

Creates a new JavaScript file

Example:

```
yo aspnet:JScript filename
```

Produces `filename.js`

[Return to top](#top)

### JSON

Creates a new JSON file

Example:

```
yo aspnet:JSON filename
```

Produces `filename.json`

[Return to top](#top)

### JSONSchema

Creates a new JSON schema file

Example:

```
yo aspnet:JSONSchema filename
```

Produces `filename.json`

[Return to top](#top)

### JSX

Creates a new React JSX file

Example:

```
yo aspnet:JSX filename
```

Produces `filename.jsx`

[Return to top](#top)

### Middleware

Creates a new C# Middleware class file

Example:

```
yo aspnet:Middleware filename
```

Produces `filename.cs`

[Return to top](#top)

### MvcController

Creates a new ASP.NET 5 MvcController class

Example:

```
yo aspnet:MvcController ContactController
```

Produces `/ContactController.cs`

```cs
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyNamespace
{
    public class ContactController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
```

[Return to top](#top)

### MvcView

Creates a new ASP.NET 5 MvcView page file

Example:

```
yo aspnet:MvcView ContactView
```

Produces `/ContactView.cshtml`

```
@*
    For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860
*@
@{
    // ViewBag.Title = "ContactView Page";
}

```

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

### PackageJson

Creates a new package.json file

Example:

```
yo aspnet:PackageJson
```

Produces `package.json`

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

### StartupClass

Creates a new Startup Class file

Example:

```
yo aspnet:StartupClass
```

Produces `Startup.cs`

[Return to top](#top)

### StyleSheet

Creates a new CSS file

Example:

```
yo aspnet:StyleSheet style
```

Produces `style.css`

[Return to top](#top)

### StyleSheetLess

Creates a new Less class file

Example:

```
yo aspnet:StyleSheetLess filename
```

Produces `filename.less`

[Return to top](#top)

### StyleSheetSCSS

Creates a new Sass SCSS class file

Example:

```
yo aspnet:StyleSheetSCSS filename
```

Produces `filename.scss`

[Return to top](#top)

### TagHelper

Creates a new TagHelper class file

Example:

```
yo aspnet:TagHelper filename
```

Produces `filename.cs`

[Return to top](#top)

### TextFile

Creates a new Text file

Example:

```
yo aspnet:TextFile filename
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

### TypeScript

Creates a new TypeScript file

Example:

```
yo aspnet:TypeScript filename
```

Produces `filename.ts`

[Return to top](#top)

### TypeScriptConfig

Creates a new TypeScript configuration file

Example:

```
yo aspnet:TypeScriptConfig
```

Produces `tsconfig.json`

[Return to top](#top)

### TypeScriptJSX

Creates a new JSX-enabled TypeScript file

Example:

```
yo aspnet:TypeScriptJSX filename
```

Produces `filename.tsx`

[Return to top](#top)

### UserSecrets

Adds UserSecrets information to ASP.NET5 `project.json` file.
The generator do not update existing keys if found and does
not create new `project.json` file.

Example:

```
yo aspnet:UserSecrets
```

This will add following keys to project.json:
- "userSecretsId" key
- "Microsoft.Extensions.Configuration.UserSecrets" key under "dependencies"

[Return to top](#top)

### WebApiController

Creates a new ASP.NET 5 WebApiController class

Example:

```
yo aspnet:WebApiController ValuesController
```

Produces `/ValuesController.cs`

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyNamespace.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
```

[Return to top](#top)

## License

Copyright 2014-2016 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

[Return to top](#top)
