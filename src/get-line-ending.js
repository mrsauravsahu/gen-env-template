function getLineEnding(input) {
  if (input.includes('\r\n')) return '\r\n'
  return '\n'
}

module.exports = getLineEnding
