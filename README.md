# generator-aspnet-xtianus

[![Build Status](https://travis-ci.org/xtianus79/generator-aspnet.svg?branch=master)](https://travis-ci.org/xtianus79/generator-aspnet)
[![npm](https://img.shields.io/npm/v/generator-aspnet-xtianus.svg)](https://www.npmjs.com/package/generator-aspnet-xtianus)
[![npm](https://img.shields.io/npm/dm/generator-aspnet-xtianus.svg)](https://www.npmjs.com/package/generator-aspnet-xtianus)
[![Dependency Status](https://david-dm.org/xtianus79/generator-aspnet.svg)](https://david-dm.org/xtianus79/generator-aspnet)

Yeoman generator for ASP.NET vNext projects with additional templates

**This repo will remain a full working version from the upstream sync to omnisharp/generator-aspnet**

## Additional Templates:

- Starter Web - Foundation 5

[![](https://cloud.githubusercontent.com/assets/8476336/7016853/a93f30d6-dcbb-11e4-8d5c-0807ecd2f738.gif)](https://github.com/xtianus79/generator-aspnet 'ASP.NET 5 Generator with additional templates')

[![NPM](https://nodei.co/npm/generator-aspnet-xtianus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/generator-aspnet-xtianus/)

[![NPM](https://nodei.co/npm-dl/generator-aspnet-xtianus.png?height=2)](https://nodei.co/npm/generator-aspnet-xtianus/)

## Getting Started

- Install: `npm i -g generator-aspnet-xtianus`
- Run: `yo aspnet-xtianus`

**Remember to always yo aspnet-xtianus for this fork**

## Usage

* `yo aspnet-xtianus` shows a wizard for generating a new ASP.NET app

* `yo aspnet-xtianus --gulp` generates gulp.js files for **web** template instead of grunt.js

* `yo aspnet-xtianus --help` shows flags and other configurable options

## Template projects

Full, template based projects available in generator:

- Empty Application
- Console Application
- Web Application
- **Starter Web Application - Foundation 5 [Readme](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md)**
- Web API Application
- Nancy ASP.NET Application
- Class Library

**Looking to build or add templates to this repo - feel free to help - contact below for more info**

## Starter Web - Foundation 5 Info

[Yeoman](http://yeoman.io) generator for [Zurb Foundation 5](http://foundation.zurb.com/). & for Visual Studio ASP.Net Vnext Integration

### Important notes:

- **F5 template places additonal files & folder structures in your project**
- Folder [app] & [dist] for static html mockup and protyping
- Folder [includes] for _header.cshtml & _footer.cshtml - partials for _Layouts.cshtml
- Files .jshintrc, .editorconfig & index.html included
- Reworked gruntfile.js for a complete frontend development methodology

**Default option here will be Sass with Libsass (for now). But you can choose Ruby version on startup.**

From Foundation 5.5+:
"Foundation is now compatible with Sass 3.4! Note: this removes Sass 3.2 compatability."
[Foundation 5 Changelog](http://foundation.zurb.com/docs/changelog.html)

## Yo ASP.Net Foundation 5 Features!
* Sass compiling
* Font Awesome (option)
* Jade templating engine (option)
* Publishing to dist directory
* Server with LiveReload (127.0.0.1:9000) for *.html
* Server k web (Windows localhost:5001) or k kestrel (OSX, Linux localhost:5004) for *.cshtml
* Bower install
* JSHint

## Grunt tasks:

run project
(compile Jade, compile Sass, bower install, livereload (server on 127.0.0.1:9000), watch)
```
$ grunt
```
publishing project (into dist directory)
(compile Jade, compile Sass, validate-js, copy, concatenation, minifications)
```
$ grunt publish
```
dist directory preview (server on 127.0.0.1:9001)
```
$ grunt server-dist
```

### Other Grunt tasks (if you want to use it)

..for copying app files to wwwroot, fonts & includes folders
```
$ grunt copy-app-files
```
..for copying bower_components files to app/bower_components
```
$ grunt copy-app-files
```
..for injecting bower libraries (also in default grunt task)
```
$ grunt bower-install
```
..for compiling Sass files
```
$ grunt compile-sass
```
..for validating javascript
```
$ grunt validate-js
```
..for compiling Jade files
```
$ grunt compile-jade
```

## Full instructions for SW Foundation 5 Template

[Starter Web Foundation 5: Readme](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md)
[Starter Web Foundation 5 Getting Started: Wiki](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md)

The Empty Application, Web Application, Web API Application are based on the new templates recently introduced with Visual Studio CTP 6 release, and you can read about this new templates on blog post accompanying CTP 6 release:  
[ASP.NET 5 Updates and other improvements for Web Developers in Visual Studio 2015 CTP 6](http://blogs.msdn.com/b/webdev/archive/2015/02/23/aspnet-5-updates-for-feb-2015.aspx)

The Nancy project is based on framework's "Hello World" template:  
[Nancy Getting Started: Introduction](https://github.com/NancyFx/Nancy/wiki/Introduction)


## Generators

Available generators:

* [aspnet-xtianus:MvcController](#mvccontroller)
* [aspnet-xtianus:MvcView](#mvcview)
* [aspnet-xtianus:WebApiContoller](#webapicontroller)
* [aspnet-xtianus:Class](#class)
* [aspnet-xtianus:StartupClass](#startupclass) 
* [aspnet-xtianus:BowerJson](#bowerjson)
* [aspnet-xtianus:CoffeeScript](#coffeescript)
* [aspnet-xtianus:Config](#config)
* [aspnet-xtianus:Gulpfile](#gulpfile)
* [aspnet-xtianus:HTMLPage](#htmlpage)
* [aspnet-xtianus:JavaScript](#javascript)
* [aspnet-xtianus:JScript](#jscript)
* [aspnet-xtianus:JSON](#json)
* [aspnet-xtianus:PackageJson](#packagejson)
* [aspnet-xtianus:TextFile](#textfile)
* [aspnet-xtianus:TypeScript](#typescript)

** Note: files generated are created in the working directory, no conventions are forced **

### MvcController

Creates a new ASP.NET 5 MvcController class 

Example:

```
yo aspnet-xtianus:MvcController ContactController
```

Produces `/ContactController.cs`

```
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
yo aspnet-xtianus:MvcView ContactView
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
yo aspnet-xtianus:WebApiController ValuesController
```

Produces `/ValuesController.cs`

```
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
yo aspnet-xtianus:Class Contact
```

Produces `/Contact.cs`

```
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
yo aspnet-xtianus:StartupClass
```

Produces `Startup.cs`

### BowerJson

Creates a new Bower file

Example:

```
yo aspnet-xtianus:BowerJson
```

Produces `bower.json`

### CoffeeScript

Creates a new CoffeeScript file

Example:

```
yo aspnet-xtianus:CoffeeScript filename
```

Produces `filename.coffee`

### Config

Creates a new config.json file

Example:

```
yo aspnet-xtianus:Config
```

Produces `config.json`

### Gulpfile

Creates a new Gulp file

Example:

```
yo aspnet-xtianus:Gulpfile
```

Produces `gulpfile.js`

### HTMLPage

Creates a new HTML file

Example:

```
yo aspnet-xtianus:HTMLPage filename
```

Produces `filename.html`

### JavaScript

Creates a new JavaScript file

Example:

```
yo aspnet-xtianus:JavaScript filename
```

Produces `filename.js`

### JScript

Creates a new JavaScript file

Example:

```
yo aspnet-xtianus:JScript filename
```

Produces `filename.js`

### JSON

Creates a new JSON file

Example:

```
yo aspnet-xtianus:JSON filename
```

Produces `filename.json`

### PackageJson

Creates a new package.json file

Example:

```
yo aspnet-xtianus:PackageJson
```

Produces `package.json`

### TextFile

Creates a new Text file

Example:

```
yo aspnet-xtianus:TextFile filename
```

Produces `filename.txt`

### TypeScript

Creates a new TypeScript file

Example:

```
yo aspnet-xtianus:TypeScript filename
```

Produces `filename.ts`


## License

Copyright 2014-2015 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

### Contact

[@xtianus](https://twitter.com/xtianus79) | [xtianus@live.com](mailto:xtianus@live.com)

### Changelog

..see **Coming soon** [CHANGELOG.md](https://github.com/xtianus79/generator-aspnet/blob/master/CHANGELOG.md) file

