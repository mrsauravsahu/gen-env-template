const unusedEnvRool = require('../../../src/utils/unused-env.rool')

describe('unusedEnvRool', () => {
  test('should return a Promise', () => {
    expect(() => unusedEnvRool()).resolves.toBeInstanceOf(Promise)
  })
})
