const { readFileSync, readdirSync } = require('fs')
const shell = require('shelljs')
const { sep } = require('path')
const { name: packageName } = require('../package.json')

const basePath = `${__dirname}${sep}file-samples`
const testTempOutputPath = `${basePath}${sep}npx-tests`

describe('gen-env-template file based npx tests', () => {
  beforeAll(() => {
    shell.exec(`mkdir ${testTempOutputPath}`)
  })

  afterAll(() => {
    shell.exec(`rm -r ${testTempOutputPath}`)
  })

  const dirList = readdirSync(basePath, { withFileTypes: true })

  dirList
    .filter((entry) => entry.isFile() && entry.name.includes('input'))
    .forEach((fileEntry) => {
      test(`npx file test case: '${fileEntry.name.replace('.input.env', '')}'`, () => {
        const inputFilePath = `${basePath}${sep}${fileEntry.name}`
        const outputFilePath = `${testTempOutputPath}${sep}${fileEntry.name.replace('input', 'output')}`
        const expectedOutputFilePath = `${basePath}${sep}${fileEntry.name.replace('input', 'output')}`

        const genvTemplate = process.env.GEN_ENV_TEMPLATE_BASE

        shell.exec(`npx -p file:/${genvTemplate} ${packageName} ${inputFilePath} ${outputFilePath}`)

        const expectedOutputString = readFileSync(expectedOutputFilePath, { encoding: 'utf-8' })
        const actualOutputString = readFileSync(outputFilePath, { encoding: 'utf-8' })
        expect(actualOutputString).toEqual(expectedOutputString)
      })
    })
})
