module.exports = {
  Ctor: require('passport-eventbrite-oauth').OAuth2Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_EVENTBRITE_CLIENTID
    const clientSecret = env.LW_EVENTBRITE_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },

  toUser: (accessToken, refreshToken, profile, done) => {
    const {id, displayName} = profile
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username: id,
        name: displayName,
        provider: 'eventbrite'
      }
    })
  }
}
