# Template Starter Web - Foundation 5.5+

**Full Readme instructions for Starter Web Template - Foundation 5.5+**

**These instructions are for the special features and abilities of this particular template**
 
**IF you would like the additional instructions of the generator-aspnet refer to the default [Readme](https://github.com/xtianus79/generator-aspnet/blob/master/README.md)**

[![](https://cloud.githubusercontent.com/assets/8476336/7016853/a93f30d6-dcbb-11e4-8d5c-0807ecd2f738.gif)](https://github.com/xtianus79/generator-aspnet 'ASP.NET 5 Generator with additional templates')

## Getting Started

The core methodology for this template installation and gruntfile.js configuration is different.  First, the installation happens in the directory you plan on working in.  For example if you are in your Projects directory for VS then you will want to create a directory in the projects directory for your appliction (Projects/webapplication1).  **Other templates work as before from the Projects directory directly.**

The gruntfile configuration is preset for all of the npm and bower packages to get a frontend developer up and running.  The bower:install grunt task is removed in favor of other grunt tasks for copy and clean.  This was done so that wiredep could be utilized throughout the project.  

**Remember to always yo aspnet-xtianus for this fork**

## Usage

- Once you have installed the Starter Web Application - Foundation 5 template you will have npm and bower automatically install.  
- The installation as of currently takes a couple moments to complete.  
- various grunt commands that are described in detail below are immediately available for use... grunt = default grunt command
- kpm commands work such as kpm restore, kpm build (deprecated), k web, k kestrel, etc... 
- There are two server loads to watch for. i.e. grunt will livereload on port http://127.0.0.1:9000/ while k web will serve on port http://127.0.0.1:5001.  **This will allow for .net production along site of static frontend html production**

**Let's get to it!**

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
### Ruby Sass with Compass or Node Sass (Libsass)

From version 0.7.0 you can use Ruby version of Sass with Compass. If you want to use Ruby version first of all you need to install compass by 'gem install compass' (it will install Sass gem too).

You don't need to use the config.rb file, all is configured in Gruntfile.js (Sass block). There will be also Compass imports in _appstyles.scss (You can modify it). If you have any problems with using Sass with Compass it is good to uninstall any of your Sass gems and Compass gems and install only Compass gem again. It will fetch proper version of Sass gem.

Ruby Sass config info: <a href="https://github.com/gruntjs/grunt-contrib-sass">https://github.com/gruntjs/grunt-contrib-sass</a>

You can also use Libsass version (default) which is very fast, but it is compatible with only older Sass 3.3. For Foundation it is ok. And I think soon it will be improved.

Node Sass config info: <a href="https://github.com/sindresorhus/grunt-sass">https://github.com/sindresorhus/grunt-sass</a>

Please test this and send issues if any.

### Jade templating engine (early stage.. PR are welcomed)

From version 0.8.0 you can use Jade templating engine (option). It gives you clean and simple html syntax and (whats important) it allows you to use partials includes like header or footer. Example:
````
html(class="no-js", lang="en")
    include partials/header
    body
        div.row
            div(class="small-12 columns panel radius")
                h1 Yo Foundation 5!
                h2(class="text-right")
                    a(href="https://github.com/juliancwirko/generator-zf5")
                        i(class="fa fa-twitter")
        include partials/footer
````
##### Problems to solve:

- jade-usemin
- bower install (wiredep) with Jade
- paths etc...
- all as the Jade option in Yeoman prompts convention..

More about Jade: [http://jade-lang.com/](http://jade-lang.com/)

### LiveReload

For LiveReload call 'grunt' (watching) command and go to http://127.0.0.1:9000

### Usemin

Read more about [grunt-usemin](https://github.com/yeoman/grunt-usemin)

### Bower-install

Now you can install your libraries much faster. Example:
```
bower search magnific-popup
...
bower install magnific-popup --save
...
grunt bower-install
```
This should inject the proper js and css paths into your html files. But you should be careful and check what was injected.
'grunt publish' will then minify and concatenate them into a clean (libraries.min.css and libraries.min.js) files.
Instead of a 'bower install' with '--save' you can manualy edit the bower.json file and then run a 'grunt bower-install'. It is also included in the default task - 'grunt'.

## Tips

- Sometimes after new version is released if you have errors when running ````yo zf5```` You should run ````npm cache clean````
- If you have problems with permissions in Linux run this : ````sudo chown -R `whoami` ~/.npm````
- if you want you can delete not used javascript components in index.html file. All remaining components will be minified and concatenated into one foundation.min.js
- if you have problems with connection to http://127.0.0.1:9000 change 'hostname' in Gruntfile.js 'connect' config. Just add ```hostname: '[your hostname]'``` line to ```options: {...}```
- if you want you can delete unnecessary/unused Foundation components from main app.scss (it will be lightest main Foundation css file)
- place all your html files in the root folder (app) or you have to change assets paths (build etc.)
- grunt useminPrepare reference file is only index.html (prevents multiple the same operations) but all html files will be processed, so remember to keep the same usemin 'comments blocks' in all your html files (for now it is good to simply copy index.html, rename it and leave header and footer css and js inclusions with 'comments blocks')
- try to avoid situation when you have the same build blocks in two html files with different assets so (examples):

```
<!-- build:js js/mfpopup/mfpopup.min.js -->
    <script src="js/mfpopup/mfpopup.js"></script>
<!-- endbuild -->
```
and
```
<!-- build:css css/mfpopup/mfpopup.min.js -->
    <script src="js/mfpopup/mfpopup.js"></script>
    <script src="js/mfpopup/other_script.js"></script>
<!-- endbuild -->
```
you can add new ones

- always verify what 'grunt bower-install' injects
- You must look aut where you initialize your project. It is better to not initialize your projec in a subfolder next to .yo-rc.json because your files will land here and not in your subfolder from where you are initializing project
- if you use Compass.. place your mixin includes after Foundation scss partials - [more info](https://github.com/juliancwirko/generator-zf5/issues/18) (by default they are in _appstyles.scss)
- if you use Jade templating remember to place at least header.jade and footer.jade in main app folder - this is needed for bower install injections

You can test it and tell me please if something is not working.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## License

Copyright 2014-2015 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

### Contact

[@xtianus](https://twitter.com/xtianus79) | [xtianus@live.com](mailto:xtianus@live.com)

### Changelog

..see **Coming soon** [CHANGELOG.md](https://github.com/xtianus79/generator-aspnet/blob/master/CHANGELOG.md) file

