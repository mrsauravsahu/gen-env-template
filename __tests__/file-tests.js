const { readFileSync, readdirSync } = require('fs')
const { normalize } = require('path')
const genEnvTemplate = require('../src/gen-env-template')

const basePath = `${__dirname}/file-samples`

describe('gen-env-template file tests', () => {
  const dirList = readdirSync(basePath, { withFileTypes: true })

  dirList
    .filter((entry) => entry.isFile() && entry.name.includes('input'))
    .forEach((fileEntry) => {
      test(`shell file test case: '${fileEntry.name.replace('.input.env', '')}'`, async () => {
        const inputFilePath = `${basePath}/${fileEntry.name}`
        const fileString = readFileSync(normalize(inputFilePath), { encoding: 'utf-8' })
        const expectedOutput = readFileSync(normalize(inputFilePath).replace('input', 'output'), { encoding: 'utf-8' })
        const receivedOutput = genEnvTemplate(fileString)
        expect(receivedOutput).toEqual(expectedOutput)
      })
    })
})
