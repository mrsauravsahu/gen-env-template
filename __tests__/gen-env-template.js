const genEnvTemplate = require('../src/gen-env-template')

describe(genEnvTemplate.name, () => {
  describe('env-template format', () => {
    test('should return empty string if .env is empty', () => {
      expect(genEnvTemplate()).toEqual('')
    })

    test('should remove value of key value pairs', () => {
      const envFileString = 'NODE_ENV=development'
      expect(genEnvTemplate(envFileString)).toEqual('NODE_ENV=')
    })

    test('should remove values for all key value pairs', () => {
      const envFileString = `
NODE_ENV=development
DB_CONNECTION_STRING=host=localhost`
      expect(genEnvTemplate(envFileString)).toEqual(`
NODE_ENV=
DB_CONNECTION_STRING=`)
    })

    test('should preserve empty lines', () => {
      const envFileString = `NODE_ENV=development

DB_CONNECTION_STRING=host=localhost`

      expect(genEnvTemplate(envFileString)).toEqual(`NODE_ENV=

DB_CONNECTION_STRING=`)
    })

    test('should not modify comments', () => {
      const envFileString = `NODE_ENV=development
# this is the database connection
DB_CONNECTION_STRING=host=localhost`

      expect(genEnvTemplate(envFileString)).toEqual(`NODE_ENV=
# this is the database connection
DB_CONNECTION_STRING=`)
    })
  })

  describe('markdown format', () => {
    test('should return empty string if .env is empty', () => {
      expect(genEnvTemplate()).toEqual('')
    })

    test('should remove value of key value pairs', () => {
      const envFileString = 'NODE_ENV=development'
      expect(genEnvTemplate(envFileString, 'md')).toEqual(`|Key|Sample Value|
|---|---|
|NODE_ENV|-|`)
    })

    test('should remove values for all key value pairs', () => {
      const envFileString = `
NODE_ENV=development
DB_CONNECTION_STRING=host=localhost`
      expect(genEnvTemplate(envFileString, 'md')).toEqual(`|Key|Sample Value|
|---|---|
|NODE_ENV|-|
|DB_CONNECTION_STRING|-|`)
    })

    test('should ignore empty lines', () => {
      const envFileString = `NODE_ENV=development

DB_CONNECTION_STRING=host=localhost`

      expect(genEnvTemplate(envFileString, 'md')).toEqual(`|Key|Sample Value|
|---|---|
|NODE_ENV|-|
|DB_CONNECTION_STRING|-|`)
    })

    test.skip('should not modify comments', () => {
      const envFileString = `NODE_ENV=development
# this is the database connection
DB_CONNECTION_STRING=host=localhost`

      expect(genEnvTemplate(envFileString, 'md')).toEqual(`NODE_ENV=
# this is the database connection
DB_CONNECTION_STRING=`)
    })
  })
})
