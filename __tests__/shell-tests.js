const { readdirSync, readFileSync } = require('fs')
const shell = require('shelljs')

const basePath = `${__dirname}/file-samples`
const testTempOutputPath = `${basePath}/shell-tests`
const bin = `node ${process.env.GEN_ENV_TEMPLATE_ABSOLUTE_PATH}`

describe('gen-env-template file based e2e tests', () => {
  beforeAll(() => {
    shell.exec(`mkdir ${testTempOutputPath}`)
  })

  afterAll(() => {
    shell.exec(`rm -r ${testTempOutputPath}`)
  })

  // test('should generate template files as per samples', async () => {
  const dirList = readdirSync(basePath, { withFileTypes: true })

  dirList
    .filter((entry) => entry.isFile() && entry.name.includes('input'))
    .forEach((fileEntry) => {
      test(`shell file test case: '${fileEntry.name.replace('.input.env', '')}'`, async () => {
        const inputFilePath = `${basePath}/${fileEntry.name}`
        const outputFilePath = `${testTempOutputPath}/${fileEntry.name.replace('input', 'output')}`
        const expectedOutputFilePath = `${basePath}/${fileEntry.name.replace('input', 'output')}`

        shell.exec(`${bin} ${inputFilePath} ${outputFilePath}`)

        const expectedOutputString = readFileSync(expectedOutputFilePath, { encoding: 'utf-8' })
        const actualOutputString = readFileSync(outputFilePath, { encoding: 'utf-8' })
        expect(actualOutputString).toEqual(expectedOutputString)
      })
    })
})
