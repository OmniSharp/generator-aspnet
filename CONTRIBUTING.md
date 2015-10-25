# Contributing to `generator-aspnet`

## TL;DR

One of the easiest ways to contribute is to participate in discussions and discuss issues. You can also contribute by submitting pull requests with code changes. Just [follow rules used in Open Source projects on GitHub.com](https://guides.github.com/activities/contributing-to-open-source/).

## How to contribute
Follow the steps below.

1. Find an issue to fix on the [issues page](https://github.com/OmniSharp/generator-aspnet/issues). If you have an idea that's not listed go ahead and create a new issue to discuss it.
1. Comment on the issue that you're interested in taking ownership of. Include details of your proposed changes.
1. One of the contributors will comment back and eventually assign the item to you

## How to update the yeoman generator

The code for the yeoman generator is located at [index.js](https://github.com/OmniSharp/generator-aspnet/blob/master/app/index.js). If you need to make changes to that make them in a feature branch and send changes in a PR to the `master` branch. A contributor will comment back and eventually merge the changes. On release these changes will be merged to the `release` branch and the npm package will be updated.

### How to make changes to the templates
The templates for the project types are stored in the /samples directory and each subgenerator has its own directory.

### Tests
If you make changes or additions to the generator, make sure that the existing tests in the `/tests` directory are also edited OR new tests are added to cover the new functionality and the tests pass.

You should make changes in a new feature branch and test them locally. When testing locally if you run the samples from the source directory make sure not to check in any files which are not needed. All files in the repo will be created in the project when the generator is used. Because of this you should not check in files like `.gitignore`.

When your changes are in good shape submit a PR and reference the issue that it relates to. One of the contributors will comment on the PR/issue and eventually merge it.

### Code style
The project repository contains configuration files to maintain consistent code styles in source code. At the moment source code styles are not enforced but you are welcome to use them and help us to avoid merge or rebase conflicts.

You are advised to use your code editor of choice feature to apply code style formatting and use EditorConfig project extension within your editor:

[http://editorconfig.org/](http://editorconfig.org/)

The JavaScript source code for generator can be linted with JSHint extension and you are welcome to lint existing and new code according to project settings.

## General feedback and discussions?
Please start a discussion on the [Home repo issue tracker](https://github.com/aspnet/Home/issues).

## Bugs and feature requests?

### Note about ASP.NET 5 and Visual Studio

Do not post issues related to ASP.NET 5  and Visual Studio tooling here. Please log a new issue in the appropriate GitHub repo. Here are some of the most common repos:

* [Visual Studio Templates](https://github.com/aspnet/Templates)
* [Visual Studio Tooling](https://github.com/aspnet/Tooling)
* [DependencyInjection](https://github.com/aspnet/DependencyInjection)
* [EntityFramework](https://github.com/aspnet/EntityFramework)
* [DNX](https://github.com/aspnet/dnx)
* [MVC](https://github.com/aspnet/Mvc)
* [ASP.NET 5 Home](https://github.com/aspnet/Home)

Or browse the full list of repos in the [aspnet](https://github.com/aspnet/) organization.

### Filing issues
When filing issues, please use our [bug filing templates](https://github.com/aspnet/Home/wiki/Functional-bug-template).
The best way to get your bug fixed is to be as detailed as you can be about the problem.

GitHub supports [markdown](https://help.github.com/articles/github-flavored-markdown/), so when filing bugs make sure you check the formatting before clicking submit.

### Contributing code and content

Make sure you can build the code. Familiarize yourself with the project workflow and our coding conventions. If you don't know what a pull request is read this article: https://help.github.com/articles/using-pull-requests.

Before submitting a feature or substantial code contribution please discuss it with the team and ensure it follows the product roadmap. You might also read these two blogs posts on contributing code: [Open Source Contribution Etiquette](http://tirania.org/blog/archive/2010/Dec-31.html) by Miguel de Icaza and [Don't "Push" Your Pull Requests](https://www.igvita.com/2011/12/19/dont-push-your-pull-requests/) by Ilya Grigorik.

**Commit/Pull Request Format**

You can use :emoji: codes in your commit message that seems to be quite popular on GitHub.com. Please use rules for :emoji: codes described in [Atom Editor contributing guidelines](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages)

```
:art: Summary of the changes (Less than 80 chars). Closes #33

 - Detail 1
 - Detail 2
```

```
Summary of the changes (Less than 80 chars). Fixes #44

 - Detail 1
 - Detail 2
```

The `Closes` and `Fixes` words are optional. See [Closing issues via commit messages](https://help.github.com/articles/closing-issues-via-commit-messages/)

> __ADVANCED__:
If your PR gets lengthy with updates from new commits, you could do some rebasing with squashing and rewording: [How to rebase a pull request](https://github.com/edx/edx-platform/wiki/How-to-Rebase-a-Pull-Request#squash-your-changes)

## The content of this file

The content of this file is loosely based on [aspnet/Home/CONTRIBUTING.md](https://github.com/aspnet/Home/blob/dev/CONTRIBUTING.md) file and the `generator-aspnet` [own wiki contributing guidelines](https://github.com/OmniSharp/generator-aspnet/wiki/How-to-Contribute)
