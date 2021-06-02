// const genEnvTemplate = require('./gen-env-template')

// module.exports = genEnvTemplate
const { Command, flags } = require('@oclif/command')

class GenEnvTemplateCommand extends Command {
  async run() {
    const { flags: appFlags } = this.parse(GenEnvTemplateCommand)
    const name = appFlags.name || 'world'
    this.log(`hello ${name} from ./src/index.js`)
  }
}

GenEnvTemplateCommand.description = `Describe the command here
...
Extra documentation goes here
`

GenEnvTemplateCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  name: flags.string({ char: 'n', description: 'name to print' }),
}

module.exports = GenEnvTemplateCommand
