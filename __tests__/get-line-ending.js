const getLineEnding = require('../src/get-line-ending')

describe(getLineEnding.name, () => {
  test('should return LF if string contains only \\n', () => {
    const inputString = 'NODE_ENV=development\nSECOND_ENV=second'
    expect(getLineEnding(inputString)).toEqual('\n')
  })

  test('should return CRLF if string contains \\r\\n', () => {
    const inputString = 'NODE_ENV=development\r\nSECOND_ENV=second'
    expect(getLineEnding(inputString)).toEqual('\r\n')
  })
})
