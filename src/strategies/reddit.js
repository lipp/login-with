module.exports = {
  Ctor: require('passport-reddit').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_REDDIT_CLIENTID
    const clientSecret = env.LW_REDDIT_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    done(null, {accessToken, refreshToken, profile})
  },
  preHook: (req, opts) => {
    req.session.state = require('crypto').randomBytes(32).toString('hex')
    opts.state = req.session.state
    opts.duration = 'permanent'
  }
}
