const constants = require('../constants')

module.exports = (tokens) => tokens
  .map((token) => {
    switch (token.type) {
      case 'EMPTY':
        return `${token.lineEnding}`
      case 'KEY_VALUE': {
        // add value to template only if safe region
        const value = token.isInSafeRegion ? token.value : ''
        return `${token.key}=${value}${token.lineEnding}`
      }
      case 'COMMENT':
        return token.raw
      default:
        return ''
    }
  })
  .join(constants.LINE_ENDING)
