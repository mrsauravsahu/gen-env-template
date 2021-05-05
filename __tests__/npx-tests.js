const { promises } = require('fs')
const shell = require('shelljs')
const { name: packageName } = require('../package.json')

const basePath = `${__dirname}/file-samples`
const testTempOutputPath = `${basePath}/npx-tests`

describe('gen-env-template file based e2e tests', () => {
  beforeAll(() => {
    shell.exec(`mkdir ${testTempOutputPath}`)
  })

  afterAll(() => {
    shell.exec(`rm -r ${testTempOutputPath}`)
  })

  test('should generate template files as per samples', async () => {
    const dirList = await promises.readdir(basePath, { withFileTypes: true })

    const expectations = dirList
      .filter((entry) => entry.isFile() && entry.name.includes('input'))
      .map(async (fileEntry) => {
        const inputFilePath = `${basePath}/${fileEntry.name}`
        const outputFilePath = `${testTempOutputPath}/${fileEntry.name.replace('input', 'output')}`
        const expectedOutputFilePath = `${basePath}/${fileEntry.name.replace('input', 'output')}`

        shell.exec(`npx -p file:/${process.env.GEN_ENV_TEMPLATE_BASE} ${packageName} ${inputFilePath} ${outputFilePath}`)

        const expectedOutputString = await promises.readFile(expectedOutputFilePath, { encoding: 'utf-8' })
        const actualOutputString = await promises.readFile(outputFilePath, { encoding: 'utf-8' })
        expect(actualOutputString).toEqual(expectedOutputString)
      })

    await Promise.all(expectations)
  })
})
