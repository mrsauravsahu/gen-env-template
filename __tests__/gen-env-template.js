const genEnvTemplate = require('../src/gen-env-template')

describe(genEnvTemplate.name, () => {
    test('should return name of the project', () => {
        expect(genEnvTemplate()).toEqual('gen-env-template')
    })
})