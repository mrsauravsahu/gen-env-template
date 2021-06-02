const { promises } = require('fs')
const { Command, flags } = require('@oclif/command')
const packageInfo = require('../package.json')
const genEnvTemplate = require('./gen-env-template')

class GenEnvTemplateCommand extends Command {
  static args = [
    {
      name: 'source',
      required: false,
      default: '.env',
      description: 'Path to the source .env file',
    },
    {
      name: 'dest',
      required: false,
      default: 'template.env',
      description: 'Path where result template .env file will be written',
    },
  ]

  async run() {
    const { args } = this.parse(GenEnvTemplateCommand)

    const envFileString = await promises.readFile(
      args.source,
      { encoding: 'utf-8' },
    )

    const templateFileString = genEnvTemplate(envFileString)
    await promises.writeFile(args.dest, templateFileString, { encoding: 'utf-8' })
  }
}

GenEnvTemplateCommand.description = packageInfo.description

GenEnvTemplateCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
}

module.exports = GenEnvTemplateCommand
