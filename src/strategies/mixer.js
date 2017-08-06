module.exports = {
  Ctor: require('passport-mixer').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_MIXER_CLIENTID
    const clientSecret = env.LW_MIXER_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        scope: env.LW_MIXER_SCOPE || 'channel:details:self'
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username: profile.username,
        photo: profile._raw.avatarUrl,
        provider: 'mixer'
      }
    })
  }
}
