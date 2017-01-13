module.exports = {
  Ctor: require('passport-github2').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_GITHUB_CLIENTID
    const clientSecret = env.LW_GITHUB_CLIENTSECRET
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
  }
}
