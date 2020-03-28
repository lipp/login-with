const scopeDecoder = require('../scopeDecoder')
const strategies = {
  facebook: require('./facebook'),
  github: require('./github'),
  google: require('./google'),
  instagram: require('./instagram'),
  linkedin: require('./linkedin'),
  mixer: require('./mixer'),
  reddit: require('./reddit'),
  spotify: require('./spotify'),
  strava: require('./strava'),
  twitter: require('./twitter'),
  apple: require('./apple'),
  test: require('./test')
}

const isConfigured = strategy => strategy.config

module.exports = (env, rootUrl) =>
  Object.keys(strategies)
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
