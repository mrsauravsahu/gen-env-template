const constants = require('./constants')
const markdownProcessor = require('./utils/markdown-processor')
const templateProcessor = require('./utils/template-processor')

function genEnvTemplate(envFileString = '', format = 'env-template', { removeRegions } = { removeRegions: false }) {
  if (envFileString === '') return ''

  let isInSafeRegion = false
  let isReadingMultilineValue = false

  const templateFileTokens = envFileString
    .split(constants.LINE_ENDING)
    .reduce((accumulator, currentLineString) => {
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

      const cleanedCurrentLine = isCRLF
        ? currentLineString.substring(0, currentLineString.length - 1)
        : currentLineString

      // If empty line
      currentToken.type = cleanedCurrentLine.trim() === '' ? 'EMPTY' : undefined
      if (currentToken.type === 'EMPTY') return [...accumulator, { ...currentToken, isInSafeRegion }]

      // If comment
      const isComment = cleanedCurrentLine.trim()[0] === '#'
      if (isComment) {
        currentToken.type = 'COMMENT'

        // Region checks
        const regionCheckString = cleanedCurrentLine.trim().replace(/ /g, '').substring(1)

        // Beginning of Safe Region
        if (regionCheckString.startsWith(`region${constants.SAFE_REGION}`)) {
          isInSafeRegion = true
          currentToken.subType = 'REGION'
        }

        // End of safe Region
        if (regionCheckString.startsWith(`endregion${constants.SAFE_REGION}`)) {
          isInSafeRegion = false
          currentToken.subType = 'REGION'
        }
      } else {
        if (isReadingMultilineValue) {
          currentToken = accumulator.pop()
          const value = cleanedCurrentLine
          if (value.endsWith('"')) {
            currentToken.value += `${value}`
          }

          return [...accumulator, currentToken]
        }

        const keyName = cleanedCurrentLine.split('=')[0].trim()
        const valueFromCurrentLine = cleanedCurrentLine.replace(new RegExp(`^${keyName}=`), '')

        currentToken = {
          ...currentToken,
          key: keyName,
          value: '',
          type: 'KEY_VALUE',
        }

        if (valueFromCurrentLine[0] !== '"') {
          isReadingMultilineValue = false
          currentToken.value = valueFromCurrentLine.trim()
        } else if (valueFromCurrentLine.endsWith('"')) {
          isReadingMultilineValue = false
          currentToken.value = valueFromCurrentLine.trim()
        } else {
          isReadingMultilineValue = true
          currentToken.value = valueFromCurrentLine.replace(/^"|"$/g, '')
        }
      }

      currentToken.isInSafeRegion = isInSafeRegion
      // console.log(JSON.stringify(accumulator, undefined, 2))
      return [...accumulator, currentToken]
    }, [])

  if (format === 'md') { return markdownProcessor(templateFileTokens, { removeRegions }) }
  return templateProcessor(templateFileTokens, { removeRegions })
}

module.exports = genEnvTemplate
