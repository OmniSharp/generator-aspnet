# generator-aspnet

[![Build Status](https://travis-ci.org/OmniSharp/generator-aspnet.svg?branch=master)](https://travis-ci.org/OmniSharp/generator-aspnet)

Yeoman generator for ASP.NET vNext projects

![](http://giant.gfycat.com/CreepyCandidBichonfrise.gif)

## Getting Started

- Install: `npm install -g generator-aspnet`
- Run: `yo aspnet`

## Usage

* `yo aspnet` shows a wizard for generating a new ASP.NET app

* `yo aspnet --help` shows flags and other configurable options

## Generators

Available generators:

* [aspnet:MvcController](#mvccontroller)
* [aspnet:MvcView](#mvcview)
* [aspnet:WebApiContoller](#webapicontroller)
* [aspnet:Class](#class)
* [aspnet:StartupClass](#startupclass) 
* [aspnet:BowerJson](#bowerjson)
* [aspnet:CoffeeScript](#coffeescript)
* [aspnet:Config](#config)
* [aspnet:Gulpfile](#gulpfile)
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
yo aspnet:Class Contact
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

Copyright 2014 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
