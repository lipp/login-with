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
    const {username, displayName, emails} = profile
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username,
        name: displayName,
        provider: 'eventbrite',
        email: emails[0].value
      }
    })
  }
}
