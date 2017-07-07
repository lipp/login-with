const strategies = {
  github: require('./github'),
  google: require('./google'),
  facebook: require('./facebook'),
  reddit: require('./reddit'),
  twitter: require('./twitter'),
  mixer: require('./mixer'),
<<<<<<< HEAD
  eventbrite: require('./eventbrite'),
=======
  linkedin: require('./linkedin'),
>>>>>>> 74dcb919b526dfb7fb9e32adb9d10f5dedd77941
  test: require('./test')
}

const isConfigured = strategy => strategy.config

module.exports = (env, rootUrl) => Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type]
    const callbackURL = `${rootUrl}/${type}/callback`
    strategy.config = strategy.getConfig(env, callbackURL)
    strategy.type = type
    return strategy
  })
  .filter(strategy => isConfigured(strategy))

