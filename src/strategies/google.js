module.exports = {
  Ctor: require('passport-google-oauth20').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_GOOGLE_CLIENTID
    const clientSecret = env.LW_GOOGLE_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['profile']
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    const {displayName, photos = []} = profile
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        id: profile.id,
        username: displayName,
        name: displayName,
        provider: 'google',
        photo: photos[0] ? photos[0].value : null
      }
    })
  }
}
