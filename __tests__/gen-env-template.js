const genEnvTemplate = require('../src/gen-env-template')

describe(genEnvTemplate.name, () => {
    test('should return empty string if .env is empty', () => {
        expect(genEnvTemplate()).toEqual('')
    })

    test('should remove value of key value pairs', () => {
        const envFileString = `NODE_ENV=development`
        expect(genEnvTemplate(envFileString)).toEqual(`NODE_ENV=`)
    })
})