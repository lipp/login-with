const strategies = {
  github: require('./github'),
  reddit: require('./reddit')
}

const getCreds = type => {
  const TYPE = type.toUpperCase()
  return {
    clientID: process.env[`LW_${TYPE}_CLIENTID`],
    clientSecret: process.env[`LW_${TYPE}_SECRET`],
    callbackURL: process.env[`LW_${TYPE}_CALLBACKURL`]
  }
}

const isValidCreds = cred => cred.clientID && cred.clientSecret && cred.callbackURL

module.exports = Object.keys(strategies)
  .map(type => {
    strategies[type].creds = getCreds(type)
    strategies[type].type = type
    return strategies[type]
  })
  .filter(strategy => isValidCreds(strategy.creds))

