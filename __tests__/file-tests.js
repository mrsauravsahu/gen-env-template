const { promises } = require('fs')
const genEnvTemplate = require('../src/gen-env-template')

describe('gen-env-template file tests', () => {
    test('should generate template files as per samples', async() => {
        const basePath = `${__dirname}/bin/file-samples`
        const dirList = await promises.readdir(basePath, { withFileTypes: true })

        const expectations = dirList
            .filter(entry => entry.isFile() && entry.name.includes('input'))
            .map(async fileEntry => {
                const inputFilePath = `${basePath}/${fileEntry.name}`
                const fileString = await promises.readFile(inputFilePath, { encoding: 'utf-8' })
                const expectedOutput = await promises.readFile(inputFilePath.replace("input", "output"), { encoding: 'utf-8' })
                const receivedOutput = genEnvTemplate(fileString)
                expect(receivedOutput).toEqual(expectedOutput)
            })

        await Promise.all(expectations)
    })
})