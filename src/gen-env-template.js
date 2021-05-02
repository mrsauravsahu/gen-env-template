function genEnvTemplate(envFileString = '') {
    if (envFileString === '') return ''

    var keyName = envFileString.split('=')[0]

    return `${keyName}=`
}

module.exports = genEnvTemplate;