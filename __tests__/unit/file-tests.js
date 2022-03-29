const fs = require('fs')
const path = require('path')
const genEnvTemplate = require('../../src/gen-env-template')

const basePath = `${path.resolve(__dirname, '..')}${path.sep}file-samples`

describe('gen-env-template file tests', () => {
  const dirList = fs.readdirSync(basePath, { withFileTypes: true })

  dirList
    .filter((entry) => entry.isFile() && entry.name.includes('input'))
    .forEach((fileEntry) => {
      test(`shell file test case: '${fileEntry.name.replace('.input.env', '')}'`, async () => {
        const inputFilePath = `${basePath}${path.sep}${fileEntry.name}`
        const fileString = fs.readFileSync(inputFilePath, { encoding: 'utf-8' })
        const expectedOutput = fs.readFileSync(inputFilePath.replace('input', 'output'), { encoding: 'utf-8' })
        const receivedOutput = genEnvTemplate(fileString)
        expect(JSON.stringify(receivedOutput)).toEqual(JSON.stringify(expectedOutput))
      })
    })
})
