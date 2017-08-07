const scopeDecoder = require('../scopeDecoder')
const strategies = {
  github: require('./github'),
  google: require('./google'),
  facebook: require('./facebook'),
  reddit: require('./reddit'),
  twitter: require('./twitter'),
  mixer: require('./mixer'),
  eventbrite: require('./eventbrite'),
  linkedin: require('./linkedin'),
  instagram: require('./instagram'),
  test: require('./test')
}

const isConfigured = strategy => strategy.config

module.exports = (env, rootUrl) => Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type]
    const callbackURL = `${rootUrl}/${type}/callback`
    strategy.config = strategy.getConfig(env, callbackURL)
    if (strategy.config && strategy.config.scope) {
      strategy.config.scope = scopeDecoder(strategy.config.scope)
    }
    strategy.type = type
    return strategy
  })
  .filter(strategy => isConfigured(strategy))

