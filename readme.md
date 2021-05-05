# gen-env-template

Generate template .env file from your .env file.

## What's new? 🎉 🥳

- Use `gen-env-template` through npx or pnpx

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

This project is Open-Source and I'm happy to hear feedback and receive improvements through Issues and PRs.

\- Sahu, S