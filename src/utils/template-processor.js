const constants = require('../constants')

module.exports = (tokens, { removeRegions }) => tokens
  .map((token, index) => {
    const lineSuffix = index === tokens.length - 1 ? '' : constants.LINE_ENDING

    switch (token.type) {
      case 'EMPTY':
        return `${token.lineEnding}${lineSuffix}`
      case 'KEY_VALUE': {
        // add value to template only if safe region
        const value = token.isInSafeRegion ? token.value : ''
        return `${token.key}=${value}${token.lineEnding}${lineSuffix}`
      }
      case 'COMMENT':
        if (removeRegions && token.subType === 'REGION') {
          return undefined
        }
        return `${token.raw}${lineSuffix}`
      default:
        return lineSuffix
    }
  })
  .filter((line) => line !== undefined)
  .join('')
