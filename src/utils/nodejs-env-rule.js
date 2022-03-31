const { EOL } = require('os')
const { Rule } = require('rools')

exports.nodejsEnvRule = new Rule({
  name: 'nodejs-env-rules',
  when: (facts) => facts.flags.lang === 'nodejs',
  then: async (facts) => {
    const { execa } = await import('execa')
    const result = await execa('grep',
      ['-o',
        '--no-filename',
        '-R',
        'process\\.env\\.[a-zA-Z0-9\\_]*',
        facts.flags.src,
      ])
    const sourceSearchOutput = result.stdout.split(EOL)
    const envKeys = sourceSearchOutput.map((line) => line.replace('process.env.', ''))

    // eslint-disable-next-line no-param-reassign
    facts.results = {
      keys: envKeys,
    }
  },
})
