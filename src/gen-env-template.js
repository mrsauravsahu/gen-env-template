const getLineEnding = require('./get-line-ending')

function genEnvTemplate(envFileString = '') {
  if (envFileString === '') return ''

  // Detect line ending
  const lineEnding = getLineEnding(envFileString)

  const templateFileString = envFileString
    .split(lineEnding)
    .map((currentLineString) => {
      // If empty line
      const isEmpty = currentLineString.trim() === ''
      if (isEmpty) return currentLineString

      // If comment
      const isComment = currentLineString.trim()[0] === '#'
      if (isComment) return currentLineString

      const keyName = currentLineString.split('=')[0]
      const templateForCurrentLine = `${keyName}=`
      return templateForCurrentLine
    })
    .join(lineEnding)

  return templateFileString
}

module.exports = genEnvTemplate
