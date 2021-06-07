const constants = require('./constants')

function genEnvTemplate(envFileString = '') {
  if (envFileString === '') return ''

  // Detect line ending
  const lineEnding = '\n'

  let isInSafeMode = false

  const templateFileString = envFileString
    .split(lineEnding)
    .map((currentLineString) => {
      const isCRLF = currentLineString.substring(currentLineString.length - 1) === '\r'
      const crlfEnding = isCRLF ? '\r' : ''

      // If empty line
      const isEmpty = currentLineString.trim() === ''
      if (isEmpty) return currentLineString

      // If comment
      const isComment = currentLineString.trim()[0] === '#'
      if (isComment) {
        // Region checks

        const regionCheckString = currentLineString.trim().replace(/ /g, '').substring(1)

        // Beginning of Safe Regionn
        const isSafeRegion = regionCheckString.startsWith(`region${constants.SAFE_REGION}`)
        if (isSafeRegion) isInSafeMode = true

        // End of safe Region
        const isEndOfSafeRegion = regionCheckString.startsWith(`endregion${constants.SAFE_REGION}`)
        if (isEndOfSafeRegion) isInSafeMode = false

        return currentLineString
      }

      // If in safe mode, return the same line without modifications
      if (isInSafeMode) return `${currentLineString.trim()}${crlfEnding}`

      const keyName = currentLineString.split('=')[0].trim()
      return `${keyName}=${crlfEnding}`
    })
    .join(lineEnding)

  return templateFileString
}

module.exports = genEnvTemplate
