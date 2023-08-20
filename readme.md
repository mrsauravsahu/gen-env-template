# gen-env-template

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gen-env-template.svg)](https://npmjs.org/package/gen-env-template)
[![License](https://img.shields.io/npm/l/gen-env-template.svg)](https://github.com/mrsauravsahu/gen-env-template/blob/main/LICENSE)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Generate template `.env.example` file from your `.env` file.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mrsauravsahu"><img src="https://avatars.githubusercontent.com/u/9134050?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Saurav Sahu</b></sub></a><br /><a href="https://github.com/mrsauravsahu/gen-env-template/commits?author=mrsauravsahu" title="Code">💻</a></td>
    <td align="center"><a href="http://abishekaditya.me"><img src="https://avatars.githubusercontent.com/u/9787009?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abishek Aditya</b></sub></a><br /><a href="https://github.com/mrsauravsahu/gen-env-template/issues?q=author%3Aabishekaditya" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/RamPrasadAgarwal"><img src="https://avatars.githubusercontent.com/u/17383560?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ram Prasad Agarwal</b></sub></a><br /><a href="https://github.com/mrsauravsahu/gen-env-template/commits?author=RamPrasadAgarwal" title="Code">💻</a></td>
    <td align="center"><a href="http://linkedin.com/in/tbueschel"><img src="https://avatars.githubusercontent.com/u/13087421?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tobias Büschel</b></sub></a><br /><a href="https://github.com/mrsauravsahu/gen-env-template/commits?author=tobiasbueschel" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Why?

A well documented template `.env` file helps set up the app.

## How to use?

This package exposes both a CLI and an SDK.

### CLI Usage

#### Install the tool

- You can install `gen-env-template` as a devDependency.

```shell
$ npm i -D gen-env-template

$ pnpm i -D gen-env-template

$ yarn add --dev gen-env-template
```

You can now use the command like so:

```sh
$ ./node_modules/.bin/gen-env-template [path to input .env]=.env [path to output .env]=.env.example
```

**Usage with npx:**

```sh
$ npx gen-env-template [path to input .env]=.env [path to output .env]=.env.example
```

(`genv` is a shorthand command which can be used interchangeably.)

This will write the output to the path specified.

### SDK Usage

The main import exposes a function with takes in the string contents of the .env file and returns the template string output

```js
const genEnvTemplate = require('gen-env-template')

const inputString = 'NODE_ENV=development'

console.log(genEnvTemplate(inputString))

>> NODE_ENV=
```

### Licensing 

This project uses the MIT license as explained [here](./LICENSE).

### Contributing 

This project is Open-Source and I'm happy to hear feedback and receive improvements through Issues and PRs. For quick response, I'm the most active on twitter [@mrsauravsahu](https://twitter.com/mrsauravsahu)

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## What's new? 🎉 🥳

- **v2.1.1** - Audit fixes and dependency updates
- **v2.1.0** - Improv: Ability to read multiline variables
- **v2.0.7** - Feat: Ability to remove region comments `#region safe`, `#endregion safe`
- **v2.0.6** - CI: Improvement (Use matrix builds to test on Windows, Linux and Mac)
- **v2.0.5** - Fix npm audit issues & bump node version
- **v2.0.4** - Update npm dependencies
- **v2.0.3** - Fix @oclif/command not found - move to dependencies
- **v2.0.2** - Bump all npm package versions
- **v2.0.1** - NPM audit fixes
- **v2.0.0** - Add format `-f` switch. Generate template-env or markdown format
- **v1.0.10** - Preserve `LF` or `CRLF` line endings from the input env file
- **v1.0.9** - Add `-d` or `--dry-run` switch to output to console
- **v1.0.8** - Remove whitespaces around key
- **v1.0.7** - Add safe region to keep sample values
- **v1.0.6** - Create CLI with OCLIF
- **v1.0.5** - Add alias command `genv`
- **v1.0.4** - Use `gen-env-template` through npx or pnpx
- **v1.0.3** - No usage change. Setup CI/CD
- **v1.0.2** - Trim bundle by ignoring files in .npmignore
- **v1.0.0** - Basic template generator
