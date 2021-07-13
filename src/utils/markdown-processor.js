const markdownProcessor = (tokens) => {
  const tableRows = tokens
    .filter((token) => token.trim() !== '')
    .map((token) => {
      const currentLineTokens = token.split('=')
      const key = currentLineTokens[0]
      const value = currentLineTokens[1] || '-'

      const currentMarkdownRowString = `|${key}|${value}|`
      return currentMarkdownRowString
    })

  const tableBody = tableRows.join('\n')
  const markdownString = `|Key|Sample Value|\n|---|---|\n${tableBody}`

  return markdownString
}

module.exports = markdownProcessor
