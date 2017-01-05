const strategies = {
  github: require('./github'),
  reddit: require('./reddit'),
  twitter: require('./twitter')
}

const env = require('../env')

const isValidCreds = cred => (
  (cred.clientID && cred.clientSecret) || (cred.consumerKey && cred.consumerSecret)
)

module.exports = Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type]
    strategy.creds = env[`${strategy.credsType}Creds`](type)
    strategy.type = type
    return strategy
  })
  .filter(strategy => isValidCreds(strategy.creds))

