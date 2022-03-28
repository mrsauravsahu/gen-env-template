const { readFileSync, readdirSync } = require('fs')
const { sep } = require('path')
const genEnvTemplate = require('../src/gen-env-template')

const basePath = `${__dirname}${sep}file-samples`

describe('gen-env-template file tests', () => {
  const dirList = readdirSync(basePath, { withFileTypes: true })

  dirList
    .filter((entry) => entry.isFile() && entry.name.includes('input'))
    .forEach((fileEntry) => {
      test(`shell file test case: '${fileEntry.name.replace('.input.env', '')}'`, async () => {
        const inputFilePath = `${basePath}${sep}${fileEntry.name}`
        const fileString = readFileSync(inputFilePath, { encoding: 'utf-8' })
        const expectedOutput = readFileSync(inputFilePath.replace('input', 'output'), { encoding: 'utf-8' })
        const receivedOutput = genEnvTemplate(fileString)
        expect(receivedOutput).toEqual(expectedOutput)
      })
    })
})
