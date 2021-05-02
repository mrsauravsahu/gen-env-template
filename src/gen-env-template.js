function genEnvTemplate(envFileString = '') {
    if (envFileString === '') return ''

    const templateFileString = envFileString
        .split('\n')
        .map(keyValueString => {
            var keyName = keyValueString.split('=')[0]
            return `${keyName}=`
        })
        .join('\n')

    return templateFileString
}

module.exports = genEnvTemplate;