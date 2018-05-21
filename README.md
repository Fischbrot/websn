# websn [![npm version][npm-image]][npm-url] [![Build status][travis-badge]][travis-url] [![Known vulnerabilities][snyk-badge]][snyk-url] [![JavaScript Standard Style][standardjs-badge]][standardjs-url]

> An opinionated webpack configuration generator for traditional front-end
> development

<img src="screenshot.png" alt="Screenshot of websn" width="562">

websn is a [webpack][webpack] configuration generator for front-end development
and the spiritual successor to [rtsn][rtsn] (the name is an amalgamation of
_rtsn_ and _webpack_). It generates a webpack configuration that has a similar
feature set as rtsn:

+ HTML beautification __or__ minification: the beautified HTML is a great
  starting point for CMS template files while the minified one is ideal for
  static sites.
+ [Sass/SCSS][sass] as CSS preprocessor: includes automated optimizations,
  autoprefixing and minification.
+ [Critical][critical] inline CSS: optimized above-the-fold rendering and great
  [PageSpeed][pagespeed] scores.
+ [Babel][babel] for transpiling ES6+ down to ES5: use the latest JavaScript
  features without having to worry about older browsers.
+ [Browserslist][browserslist] for automated browser version targeting: do not
  think about which CSS or JS features are supported in the browsers you target
  just write your JS using the latest ES6+ features and your CSS without any
  vendor prefixes – webpack will do the rest.
+ [imagemin][imagemin] for automatic image optimization.
+ Automatic copying of everything that does not need to be transformed: useful
  for fonts and other static assets.
+ Configurable copying from `node_modules`: makes it easy to use assets from
  installed packages without having to rely on loaders which will not work if
  the assets are not required anywhere in files processed by webpack. Ideal for
  CMS themes or other cases where you might have to incorporate files not
  handled by webpack.
+ [webpack-dev-server][webpack-dev-server] for automatic browser refreshing and
  [Hot Module Replacement][hot-module-replacement] during development.
+ Project bootstrapping with useful (dot)files.
+ Several configuration options to easily adjust input/output files/directories
  etc. without having to touch the webpack configuration at all.

## Table of contents

+ [Background](#background)
+ [Install](#install)
  + [Dependencies](#dependencies)
  + [Updating](#updating)
+ [Usage](#usage)
  + [CLI](#cli)
  + [Configuration](#configuration)
  + [Build](#build)
  + [Migrating from rtsn](#migrating-from-rtsn)
+ [Donate](#donate)
+ [Maintainer](#maintainer)
+ [Contribute](#contribute)
+ [License](#license)

## Background

websn's goal was to keep most of rtsn's features while modernizing everything
with webpack and keeping the configuration as simple as possible, so even
people who have never worked with webpack and/or are new to front-end Web
development before can pick it up easily.

Its focus is more on _traditional_ front-end development where you end up with
your HTML, CSS and JS split up into separate files. This makes it well suited
for CMS theme development (e.g., for [WordPress][wordpress]). However, the
configuration is also easily expandable for more modern style SPA development
with [Vue][vue] or other frameworks.

The following features have purposefully been dropped in comparison to rtsn:

+ [Pug][pug] support: with all the tools available in modern editors that
  make writing plain HTML easier and more comfortable than ever, Pug is not
  needed for simple templating anymore. And while it is still useful for
  generating static sites, this is not the main focus of websn.
+ [Less][less] support: it does not really do anything better than Sass/SCSS
  but complicates things for people new to Web development by making them
  choose. If there is demand for it, I will consider making it an option.
+ [ngrok][ngrok] support: ngrok is a great tool and while I would have loved
  to include it, getting it to play nice with the dev server is a bit of a
  pain. It might make a comeback in a later release though!

Additional features (more generator options, customized webpack configurations,
support for additional technologies/frameworks etc.) might come in the future.

## Install

websn should be installed globally to make it as easy to use as possible. This
guide focuses on using [Yarn][yarn] which is recommended due to its speed, but
[npm][npm] will also work.

```zsh
user@local:~$ yarn global add websn
```

### Dependencies

+ [Node.js][nodejs] (tested on `10.1.0`+)
+ [Yarn][yarn] (tested on `1.6.0`+)
  + __or__ [npm][npm] (tested on `6.0.0`+)

### Updating

Upgrading a globally installed version of websn is as easy as installing it:

```zsh
user@local:~$ yarn global upgrade websn
```

__Important:__ Updating the dependencies and configuration of existing projects
is currently not supported. In contrast to rtsn, websn has been designed to be
a tool to quickly get a project running and to not make it depend on it in the
future.

## Usage

### CLI

You can create a new project with websn using the following command:

```zsh
user@local:~$ websn <project name>
```

This will prompt you for some input (like you might already have seen when
using `npm init` or `yarn init`) and will then create your project in a new
directory (relative to your current directory, so make sure to always run websn
in the directory you want your project directory to be located in).

After websn has finished, simply switch to your new project directory and
install the dependencies to finish the setup:

```zsh
user@local:~$ cd <project name>
user@local:<project name>$ yarn install
```

A few other commands are available as well:

```zsh
user@local:~$ websn --help # prints information about using websn
user@local:~$ websn --version # prints the current version of websn
```

### Configuration

websn offers you to change some aspects of your development configuration
without having to touch webpack itself. You can find this configuration in
`<project name>/websn.config.js`.

This is mainly intended as a starting point for developers who are new to
webpack, so once you are familiar with it, feel free to start tinkering with
webpack itself.

The following options are available:

+ `input.base: "src"`: the base input directory. This is where your code is
  located.
+ `input.entry: "index.js"`: the entry file. This is where you need to
  require/import your JS/Sass/SCSS in order to process it with webpack.
+ `input.htmlFiles: ["index.html"]`: the HTML entry files. You can define as
  many as you need.
+ `input.styles: "styles"`: the directory where you Sass/SCSS is located.
  Important for a correct build process.
+ `output.base: "dist"`: the base output directory. This is where webpack will
  output your build to.
+ `output.styles: "css/site.css"`: the file your styles will be bundled into.
+ `output.scripts: "js/site.js"`: the file your JavaScript will be bundled
  into.
+ `style.minifiedHtml: true`: enables HTML minification on production builds.
+ `style.beautifiedHtml: true`: enables HTML beautification on production
  builds. Does not have any effect when `style.minifiedHtml` is enabled as well.
+ `style.criticalCss: false`: enables critical inline CSS on production builds.
  Currently only works with the first HTML entry file to not kill performance
  when there are a lot of entries.
+ `vendoryCopy: []`: files that should be copied from package directories under
  `node_modules`. As shown in the example that exists after installation, every
  instruction takes three properties: `from`, the package directory where you
  want to copy something from, `files`, a [glob pattern][glob] to match the
  files you want to copy, and `to`, the target directory relative to the
  configured `output.base`. Wrong instructions will usually not result in an
  error.
+ `devServer.port: 9000`: the port the dev server should be listening on.
+ `devServer.hot: true`: enables hot module replacement.
+ `devServer.open: true`: opens a browser tab once the dev server starts.
+ `devServer.overlay: true`: displays an overlay directly in the browser when
  there is an error.
+ `devServer.reloadOnChange: []`: defines the file types that should cause the
  dev server to restart when files are changed. The default file types should
  be a good starting point. File types that are handled via loaders
  (JS/Sass/SCSS) do not have to be included as the dev server can determine
  changes to them by default.

__Important:__ Make sure to restart the dev server after changing any settings.
It unfortunately cannot detect configuration changes while it is running.

### Build

Use the following command to make a new production build:

```zsh
user@local:<project name>$ yarn run build
```

And the following to start the dev server:

```zsh
user@local:<project name>$ yarn run serve
```

To stop the dev server, use <kbd>⌃ Control</kbd> <kbd>C</kbd>.

### Migrating from rtsn

If you want to migrate from rtsn to the webpack configuration generated with
websn, you will have to make some considerations first:

+ Does my project rely on Less?
+ Does my project rely on Pug?
+ Do I need the ngrok tunneling functionality when developing?

All those features are currently not supported. But if the answer to all those
questions is no, your are good to go.

First of all, you have to create a new project with websn as described under
[CLI](#cli). Adjust the `package.json` to mimic the one of your legacy project
after finishing the project generation with websn. You can of course leave out
all the development-related dependencies rtsn had added (and you do not need
any longer) and the `rtsnConfig` section itself.

Next, copy over your source code from your legacy project. You will probably
have to make some adjustments to your code. E.g., while rtsn would process
your Sass/SCSS separately from your JS, this is not the case with webpack.
Instead, you will need to import the file that is used under
`rtsnConfig.files.sassSource` into your webpack entry file (`input.entry` in
your `websn.config.json`). This could look like this:

```javascript
import '@@/styles/main.scss'
```

Finally, you need to make adjustments to your configuration if you do not want
to adjust your file naming etc. to work with the default configuration in
`websn.config.js`. E.g., `rtsnConfig.files.jsSource` will likely become your
`websnConfig.input.entry` under websn while any entries in
`rtsnConfig.vendorCopy` work pretty much the same but have to be written a
little bit different.

If in doubt, just try making a build and read the error message if something
goes wrong. And feel free to send me a message if you need any help.

Here is a complete list of all the settings under `rtsnConfig` in your
`package.json` and what you should do with them when migrating:

+ `port`: becomes `devServer.port`.
+ `baseUrl`: not needed any longer.
+ `directories.source`: becomes `input.base`.
+ `directories.build`: becomes `output.base`.
+ `directories.imgSource`: not needed any longer, webpack looks for images to
  process recursively in `input.base`.
+ `directories.imgBuild`: not needed any longer. The build directory for any
  image will be the same under `output.base` as it is under `input.base`. If
  you have images in multiple directories, this will also work with websn.
+ `directories.htmlSource`: not needed any longer. However, you will need to
  configure all your HTML entry files with `input.htmlFiles`.
+ `directories.pugSource`: not supported.
+ `directories.markupBuild`: not needed any longer. The build directory for any
  HTML file will be the same under `output.base` as it is under `input.base`.
  If you have HTML files in multiple directories, this will also work with
  websn.
+ `directories.sassSource`: becomes `input.styles`.
+ `directories.lessSource`: not supported.
+ `directories.cssBuild`: becomes `output.styles` when merged with
  `files.cssBuild` (e.g., `css/site.css`).
+ `directories.jsSource`: not needed any longer.
+ `directories.jsBuild`: becomes `output.scripts` when merged with
  `files.jsBuild` (e.g., `js/site.js`).
+ `files.sassSource`: not needed any longer. However, you will need to
  import this file in your `input.entry` as described in more detail above.
+ `files.lessSource`: not supported.
+ `files.jsSource`: becomes `input.entry`.
+ `files.cssBuild`: becomes `output.styles` when merged with
  `directories.cssBuild` (e.g., `css/site.css`).
+ `files.jsBuild`: becomes `output.scripts` when merged with
  `directories.jsBuild` (e.g., `js/site.js`).
+ `vendoryCopy`: becomes `vendorCopy`. The syntax is a little bit different.

## Donate

If you like websn and want to buy me a coffee, feel free to donate via PayPal:

[![Donate via PayPal][paypal-image]][paypal-url]

Alternatively, you can also send me BTC:

![Donate BTC][btc]  
`13jRyroNn8QF4mbGZxKS6mR3PsxjYTsGsu`

Donations are unnecessary, but very much appreciated. :)

## Maintainer

[mserajnik][maintainer]

## Contribute

You are welcome to help out!

[Open an issue][issues] or submit a pull request.

## License

[MIT](LICENSE.md) © Michael Serajnik

[npm-url]: https://www.npmjs.com/package/websn
[npm-image]: https://img.shields.io/npm/v/websn.svg

[travis-url]: https://travis-ci.com/mserajnik/websn
[travis-badge]: https://travis-ci.com/mserajnik/websn.svg

[snyk-url]: https://snyk.io/test/github/mserajnik/websn
[snyk-badge]: https://snyk.io/test/github/mserajnik/websn/badge.svg

[standardjs-url]: https://standardjs.com
[standardjs-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg

[websn]: screenshot.png
[webpack]: https://webpack.js.org
[rtsn]: https://github.com/mserajnik/rtsn
[wordpress]: http://en.wordpress.org
[vue]: https://vuejs.org/
[sass]: http://sass-lang.com
[critical]: https://github.com/addyosmani/critical
[pagespeed]: https://developers.google.com/speed/pagespeed/insights/
[babel]: https://babeljs.io
[browserslist]: https://github.com/browserslist/browserslist
[imagemin]: https://github.com/imagemin/imagemin
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server/
[hot-module-replacement]: https://webpack.js.org/concepts/hot-module-replacement/
[pug]: https://pugjs.org
[less]: http://lesscss.org
[ngrok]: https://ngrok.com/
[nodejs]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/
[npm]: https://www.npmjs.com/
[glob]: https://en.wikipedia.org/wiki/Glob_(programming)

[paypal-url]: https://www.paypal.me/mserajnik
[paypal-image]: https://www.paypalobjects.com/webstatic/en_US/i/btn/png/blue-rect-paypal-26px.png
[btc]: https://mserajnik.at/external/btc.png

[maintainer]: https://github.com/mserajnik
[issues]: https://github.com/mserajnik/websn/issues/new
