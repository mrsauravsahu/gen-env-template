#! env node

const { promises } = require('fs')

const genEnvTemplate = require('../gen-env-template')

const envFilePath = process.argv[2] || '.env'
const outputPath = process.argv[3] || 'template.env'

const cliGenEnvTemplateAsync = async () => {
  const envFileString = await promises.readFile(envFilePath, { encoding: 'utf-8' })

  const templateFileString = genEnvTemplate(envFileString)
  await promises.writeFile(outputPath, templateFileString, { encoding: 'utf-8' })
}

cliGenEnvTemplateAsync()
