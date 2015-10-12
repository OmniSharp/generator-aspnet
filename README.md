# generator-aspnet

[![Build Status](https://travis-ci.org/OmniSharp/generator-aspnet.svg?branch=master)](https://travis-ci.org/OmniSharp/generator-aspnet)
![Version](https://img.shields.io/npm/v/generator-aspnet.svg)
![Downloads per month](https://img.shields.io/npm/dm/generator-aspnet.svg)

Yeoman generator for ASP.NET 5 projects

[![](https://cloud.githubusercontent.com/assets/14539/10110294/8a09f7b2-63cc-11e5-8d48-918a8964389a.gif)](https://github.com/OmniSharp/generator-aspnet 'ASP.NET 5 Generator')

## Getting Started

- Dependencies:
    - node.js: `brew install node` for OSX, `choco install nodejs` for Windows
    - Yeoman: `npm install -g yo`
- Install: `npm install -g generator-aspnet`
- Run: `yo aspnet`

## Usage

* `yo aspnet` shows a wizard for generating a new ASP.NET app

* `yo aspnet --grunt` generates Gruntfile.js files for **web** template instead of gulp.js

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

The Empty Application, Web Application, Web Application Basic (a.k.a. Web Application No Auth), Web API Application are based on the new templates recently introduced with Visual Studio 2015 RC release, with updates for `beta5`. You can read about these new templates on the blog post accompanying the `beta5` release:
[Updates to ASP.NET 5 yeoman generators for beta 5](http://blogs.msdn.com/b/webdev/archive/2015/07/04/updates-to-asp-net-5-yeoman-generators-for-beta-5.aspx)

The Nancy project is based on framework's "Hello World" template:
[Nancy Getting Started: Introduction](https://github.com/NancyFx/Nancy/wiki/Introduction)

The [Docker](https://www.docker.com/) support with `Dockerfile` configuration files is based on the official [Docker image for ASP.NET 5](https://github.com/aspnet/aspnet-docker)

## Related yeoman generators

The goal of `generator-aspnet` is to provide an experience consistent with creating new ASP.NET 5 (_DNX_) projects
and files in Visual Studio 2015. Below are some other related generators that you may be interested in.

### `generator-csharp`

[`generator-csharp`](https://github.com/OmniSharp/generator-csharp) is a work in progress but is available for you to try out today. The goal of [`generator-csharp`](https://github.com/OmniSharp/generator-csharp) is to provide an experience consistent with creating C# projects (_MSBuild based, not DNX_) and files in Visual Studio 2015.

### `generator-aspnet-xtianus`

[`generator-aspnet-xtianus`](https://github.com/xtianus79/generator-aspnet) is an extension of OmniSharp/generator-aspnet that comes with a special Foundation 5 SASS/SCSS framework ready out of the box with wiredep & other grunt tasks for advanced front-end development. Look for => [`Starter Web Application - Foundation 5`](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md). The other goal of this generator is to provide alternative templates to the traditional ASP.NET Visual Studio templates. More templates will become housed under this fork in the near future.  Feel free to participate and learn more about [`generator-aspnet-xtianus](https://github.com/xtianus79/generator-aspnet).

If you are working on a related generator please [open an issue](https://github.com/OmniSharp/generator-aspnet/issues/new) to let us know about it so that we can add it to the list.

## Sub Generators

The alphabetic list of available sub generators (_to create files after the project has been created_):

* [aspnet:AngularController](#angularcontroller)
* [aspnet:AngularControllerAs](#angularcontrolleras)
* [aspnet:AngularDirective](#angulardirective)
* [aspnet:AngularFactory](#angularfactory)
* [aspnet:AngularModule](#angularmodule)
* [aspnet:BowerJson](#bowerjson)
* [aspnet:Class](#class)
* [aspnet:CoffeeScript](#coffeescript)
* [aspnet:Config](#config)
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
* [aspnet:PackageJson](#packagejson)
* [aspnet:StartupClass](#startupclass)
* [aspnet:StyleSheet](#stylesheet)
* [aspnet:StyleSheetLess](#stylesheetless)
* [aspnet:StyleSheetScss](#stylesheetscss)
* [aspnet:TagHelper](#taghelper)
* [aspnet:TextFile](#textfile)
* [aspnet:tfignore](#tfignore)
* [aspnet:TypeScript](#typescript)
* [aspnet:TypeScriptConfig](#typescriptconfig)
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

### Config

Creates a new config.json file

Example:

```
yo aspnet:Config
```

Produces `config.json`

[Return to top](#top)

### Dockerfile

Creates a new Docker configuration file

Example:
```
yo aspnet:Dockerfile
```

Creates a new `Dockerfile`

Are you curious about Docker, Linux containers and ASP.NET 5 Docker image and all these buzz words?
- [Docker image for ASP.NET 5 (Docker Hub)](https://hub.docker.com/r/microsoft/aspnet/)
- [Running ASP.NET 5 applications in Linux Containers with Docker (MSDN)](http://blogs.msdn.com/b/webdev/archive/2015/01/14/running-asp-net-5-applications-in-linux-containers-with-docker.aspx)

[Return to top](#top)

### gitignore

Creates a new .gitignore file

Example:

```
yo aspnet:gitignore
```

Produces `.gitignore`

[Return to top](#top)

### Gulpfile

Creates a new Gulp file

Example:

```
yo aspnet:Gulpfile
```

Produces `gulpfile.js`

[Return to top](#top)

### Gruntfile

Creates a new `Grunt` file

Example:

```
yo aspnet:Gruntfile
```

Produces `Gruntfile.js`

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

### PackageJson

Creates a new package.json file

Example:

```
yo aspnet:PackageJson
```

Produces `package.json`

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

Copyright 2014-2015 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

[Return to top](#top)
