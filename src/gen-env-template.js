const constants = require('./constants')
const markdownProcessor = require('./utils/markdown-processor')
const templateProcessor = require('./utils/template-processor')

function genEnvTemplate(envFileString = '', format = 'env-template') {
  if (envFileString === '') return ''

  let isInSafeRegion = false

  const templateFileTokens = envFileString
    .split(constants.LINE_ENDING)
    .map((currentLineString) => {
      let currentToken = {
        lineEnding: undefined,
        type: undefined,
        raw: currentLineString,
        key: undefined,
        value: undefined,
        isInSafeRegion: false,
      }

      const isCRLF = currentLineString.substring(
        currentLineString.length - 1,
      ) === constants.CRLF_ENDING
      currentToken.lineEnding = isCRLF ? constants.CRLF_ENDING : ''

      // If empty line
      currentToken.type = currentLineString.trim() === '' ? 'EMPTY' : undefined
      if (currentToken.type === 'EMPTY') return { ...currentToken, isInSafeRegion }

      // If comment
      const isComment = currentLineString.trim()[0] === '#'
      if (isComment) {
        currentToken.type = 'COMMENT'
        // Region checks
        const regionCheckString = currentLineString.trim().replace(/ /g, '').substring(1)

        // Beginning of Safe Region
        if (regionCheckString.startsWith(`region${constants.SAFE_REGION}`)) {
          isInSafeRegion = true
        }

        // End of safe Region
        if (regionCheckString.startsWith(`endregion${constants.SAFE_REGION}`)) {
          isInSafeRegion = false
        }
      } else {
        const keyName = currentLineString.split('=')[0].trim()
        const value = currentLineString.replace(new RegExp(`^${keyName}=`), '')
        currentToken = {
          ...currentToken,
          key: keyName,
          value,
          type: 'KEY_VALUE',
        }
      }

      currentToken.isInSafeRegion = isInSafeRegion
      return currentToken
    })

  if (format === 'md') { return markdownProcessor(templateFileTokens) }
  return templateProcessor(templateFileTokens)
}

module.exports = genEnvTemplate
