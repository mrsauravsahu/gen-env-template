const { promises } = require('fs')
const shell = require('shelljs')
const genEnvTemplate = require('../src/gen-env-template')

const basePath = `${__dirname}/file-samples`
const testTempOutputPath = `${basePath}/e2e`
const bin = `node ${process.env.GEN_ENV_TEMPLATE_ABSOLUTE_PATH}`;

describe('gen-env-template file based e2e tests', () => {
    beforeAll(() => {
        shell.exec(`mkdir ${testTempOutputPath}`)
    })

    afterAll(() => {
        shell.exec(`rm -r ${testTempOutputPath}`)
    })

    test('should generate template files as per samples', async() => {
        const dirList = await promises.readdir(basePath, { withFileTypes: true })

        const expectations = dirList
            .filter(entry => entry.isFile() && entry.name.includes('input'))
            .map(async fileEntry => {
                const inputFilePath = `${basePath}/${fileEntry.name}`
                const outputFilePath = `${testTempOutputPath}/${fileEntry.name.replace("input", "output")}`
                const expectedOutputFilePath = `${basePath}/${fileEntry.name.replace("input", "output")}`

                shell.exec(`${bin} ${inputFilePath} ${outputFilePath}`)

                const expectedOutputString = await promises.readFile(expectedOutputFilePath, { encoding: 'utf-8' })
                const actualOutputString = await promises.readFile(outputFilePath, { encoding: 'utf-8' })
                expect(actualOutputString).toEqual(expectedOutputString)
            })

        await Promise.all(expectations)
    })
})