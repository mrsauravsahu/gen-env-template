# gen-env-template

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gen-env-template.svg)](https://npmjs.org/package/gen-env-template)
[![License](https://img.shields.io/npm/l/gen-env-template.svg)](https://github.com/mrsauravsahu/gen-env-template/blob/cool/LICENSE)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Generate template .env file from your .env file.

## What's new? 🎉 🥳

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

## Why?

- Manual work is boring. 
- For documenting Environment Variables an app needs, it's always best to add a template .env file to source control.

## How to use?

This package exposes both a CLI and an SDK 

### CLI Usage

#### Install the tool 

- You can install globally or locally
- With pnpm, npm, yarn 

Examples: 

```
$ npm i -g gen-env-template

$ pnpm i -g gen-env-template

$ yarn global add gen-env-template
```

The above command should add the gen-env-template to your `$PATH`. 

```
+ gen-env-template@1.0.0
```

You can now use the command like so:

```
gen-env-template [path to input .env]=.env [path to output .env]=template.env
```

This will write the output to the path specified.

### SDK Usage

The main import exposes a function with takes in the string contents of the .env file and returns the template string output

```
const genEnvTemplate = require('gen-env-template')

const inputString = 'NODE_ENV=development'

console.log(genEnvTemplate(inputString))

>> NODE_ENV=
```

### Licensing 

This project uses the MIT license as explained [here](./LICENSE)

### Contributing 

This project is Open-Source and I'm happy to hear feedback and receive improvements through Issues and PRs. For quick response, I'm the most active on twitter [@mrsauravsahu](https://twitter.com/mrsauravsahu) \- Saurav

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mrsauravsahu"><img src="https://avatars.githubusercontent.com/u/9134050?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Saurav Sahu</b></sub></a><br /><a href="https://github.com/mrsauravsahu/gen-env-template/commits?author=mrsauravsahu" title="Code">💻</a></td>
    <td align="center"><a href="http://abishekaditya.me"><img src="https://avatars.githubusercontent.com/u/9787009?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abishek Aditya</b></sub></a><br /><a href="https://github.com/mrsauravsahu/gen-env-template/issues?q=author%3Aabishekaditya" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!