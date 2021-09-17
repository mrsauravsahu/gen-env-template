const markdownProcessor = (tokens) => {
  const tableRows = tokens
    .map((token) => {
      if (token.type !== 'KEY_VALUE') return undefined
      const valueToPrint = token.isInSafeRegion ? token.value : '-'

      const currentMarkdownRowString = `|${token.key}|${valueToPrint}|`
      return currentMarkdownRowString
    })

  const tableBody = tableRows.filter((row) => row !== undefined).join('\n')
  const markdownString = `|Key|Sample Value|\n|---|---|\n${tableBody}`

  return markdownString
}

module.exports = markdownProcessor
