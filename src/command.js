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

  static description = packageInfo.description

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    // add --help flag to show CLI version
    help: flags.help({ char: 'h' }),
    // add dry-run flag to output to the console
    'dry-run': flags.boolean({ char: 'd' }),
    format: flags.enum({
      char: 'f',
      options: ['env-template', 'md'],
      description: 'Format for the template generation',
      default: 'env-template',
      name: 'format',
      required: false,
    }),
    'remove-regions': flags.boolean({
      char: 'r',
      description: 'remove region comments from the template',
    }),
  }

  async run() {
    const { args, flags: appFlags } = this.parse(GenEnvTemplateCommand)

    const envFileString = await promises.readFile(
      args.source,
      { encoding: 'utf-8' },
    )

    const templateFileString = genEnvTemplate(envFileString, appFlags.format)

    if (appFlags['dry-run']) {
      // eslint-disable-next-line no-console
      console.log(templateFileString)
    } else {
      await promises.writeFile(args.dest, templateFileString, { encoding: 'utf-8' })
    }
  }
}

module.exports = GenEnvTemplateCommand
