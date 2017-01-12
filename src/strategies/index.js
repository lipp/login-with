const strategies = {
  github: require('./github'),
  reddit: require('./reddit'),
  twitter: require('./twitter'),
  test: require('./test')
}

const env = require('../env')

const isValidCreds = cred => (
  (cred.clientID && cred.clientSecret) || (cred.consumerKey && cred.consumerSecret) || cred._test
)

module.exports = Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type]
    strategy.creds = type === 'test' ? {_test: true} : env[`${strategy.credsType}Creds`](type)
    strategy.type = type
    return strategy
  })
  .filter(strategy => isValidCreds(strategy.creds))

