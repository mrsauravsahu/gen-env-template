function genEnvTemplate(envFileString = '') {
    if (envFileString === '') return ''

    const templateFileString = envFileString
        .split('\n')
        .map(currentLineString => {
            // If empty line
            const isEmpty = currentLineString.trim() === ''
            if (isEmpty) return currentLineString

            var keyName = currentLineString.split('=')[0]
            var templateForCurrentLine = `${keyName}=`
            return templateForCurrentLine
        })
        .join('\n')

    return templateFileString
}

module.exports = genEnvTemplate;