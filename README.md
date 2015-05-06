# generator-aspnet

[![Build Status](https://travis-ci.org/OmniSharp/generator-aspnet.svg?branch=master)](https://travis-ci.org/OmniSharp/generator-aspnet)
![Version](https://img.shields.io/npm/v/generator-aspnet.svg)
![Downloads per month](https://img.shields.io/npm/dm/generator-aspnet.svg)

Yeoman generator for ASP.NET vNext projects

[![](https://cloud.githubusercontent.com/assets/14539/7401059/68a5007e-eec1-11e4-8b47-f0de0e4d3746.gif)](https://github.com/OmniSharp/generator-aspnet 'ASP.NET 5 Generator')

## Getting Started

- Dependencies:
    - node.js: `brew install node` for OSX, `choco install node` for Windows
    - Yeoman: `npm install -g yo`
- Install: `npm install -g generator-aspnet`
- Run: `yo aspnet`

## Usage

* `yo aspnet` shows a wizard for generating a new ASP.NET app

* `yo aspnet --gulp` generates gulp.js files for **web** template instead of grunt.js

* `yo aspnet --help` shows flags and other configurable options

## Template projects

Full, template based projects available in generator:

- Empty Application
- Console Application
- Web Application
- Web API Application
- Nancy ASP.NET Application
- Class Library

The Empty Application, Web Application, Web API Application are based on the new templates recently introduced with Visual Studio CTP 6 release, and you can read about this new templates on blog post accompanying CTP 6 release:
[ASP.NET 5 Updates and other improvements for Web Developers in Visual Studio 2015 CTP 6](http://blogs.msdn.com/b/webdev/archive/2015/02/23/aspnet-5-updates-for-feb-2015.aspx)

The Nancy project is based on framework's "Hello World" template:
[Nancy Getting Started: Introduction](https://github.com/NancyFx/Nancy/wiki/Introduction)

## Related yeoman generators

The goal of ```generator-aspnet``` is to provide an experience consistent with creating new ASP.NET 5 (_DNX_) projects
and files in Visual Studio 2015. Below are some other related generators that you may be interested in.

### ```generator-csharp```

[```generator-csharp```](https://github.com/OmniSharp/generator-csharp) is a work in progress but is available for you to try out today. The goal of [```generator-csharp```](https://github.com/OmniSharp/generator-csharp) is to provide an experience consistent with creating C# projects (_MSBuild based, not DNX_) and files in Visual Studio 2015.

### ```generator-aspnet-xtianus```

[```generator-aspnet-xtianus```](https://github.com/xtianus79/generator-aspnet) is an extension of OmniSharp/generator-aspnet that comes with a special Foundation 5 SASS/SCSS framework ready out of the box with wiredep & other grunt tasks for advanced front-end development. Look for => [```Starter Web Application - Foundation 5```](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md). The other goal of this generator is to provide alternative templates to the traditional ASP.NET Visual Studio templates. More templates will become housed under this fork in the near future.  Feel free to participate and learn more about [```generator-aspnet-xtianus```](https://github.com/xtianus79/generator-aspnet).

If you are working on a related generator please [open an issue](https://github.com/OmniSharp/generator-aspnet/issues/new) to let us know about it so that we can add it to the list.

## Sub Generators

Available sub generators (_to create files after the project has been created_):

* [aspnet:MvcController](#mvccontroller)
* [aspnet:MvcView](#mvcview)
* [aspnet:WebApiContoller](#webapicontroller)
* [aspnet:Class](#class)
* [aspnet:StartupClass](#startupclass)
* [aspnet:BowerJson](#bowerjson)
* [aspnet:CoffeeScript](#coffeescript)
* [aspnet:Config](#config)
* [aspnet:Gulpfile](#gulpfile)
* [aspnet:gitignore](#gitignore)
* [aspnet:HTMLPage](#htmlpage)
* [aspnet:JavaScript](#javascript)
* [aspnet:JScript](#jscript)
* [aspnet:JSON](#json)
* [aspnet:PackageJson](#packagejson)
* [aspnet:TextFile](#textfile)
* [aspnet:TypeScript](#typescript)

** Note: files generated are created in the working directory, no conventions are forced **

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

### StartupClass

Creates a new Startup Class file

Example:

```
yo aspnet:StartupClass
```

Produces `Startup.cs`

### BowerJson

Creates a new Bower file

Example:

```
yo aspnet:BowerJson
```

Produces `bower.json`

### CoffeeScript

Creates a new CoffeeScript file

Example:

```
yo aspnet:CoffeeScript filename
```

Produces `filename.coffee`

### Config

Creates a new config.json file

Example:

```
yo aspnet:Config
```

Produces `config.json`

### Gulpfile

Creates a new Gulp file

Example:

```
yo aspnet:Gulpfile
```

Produces `gulpfile.js`

### gitignore

Creates a new .gitignore file

Example:

```
yo aspnet:gitignore
```

Produces `.gitignore`

### HTMLPage

Creates a new HTML file

Example:

```
yo aspnet:HTMLPage filename
```

Produces `filename.html`

### JavaScript

Creates a new JavaScript file

Example:

```
yo aspnet:JavaScript filename
```

Produces `filename.js`

### JScript

Creates a new JavaScript file

Example:

```
yo aspnet:JScript filename
```

Produces `filename.js`

### JSON

Creates a new JSON file

Example:

```
yo aspnet:JSON filename
```

Produces `filename.json`

### PackageJson

Creates a new package.json file

Example:

```
yo aspnet:PackageJson
```

Produces `package.json`

### TextFile

Creates a new Text file

Example:

```
yo aspnet:TextFile filename
```

Produces `filename.txt`

### TypeScript

Creates a new TypeScript file

Example:

```
yo aspnet:TypeScript filename
```

Produces `filename.ts`



## License

Copyright 2014-2015 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
