module.exports = {
  Ctor: require('passport-strava').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_STRAVA_CLIENTID
    const clientSecret = env.LW_STRAVA_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  toUser: (token, tokenSecret, profile, done) => {
    const {provider, username, displayName, avatar} = profile
    done(null, {
      token,
      tokenSecret,
      profile: {
        username,
        provider,
        photo: avatar,
        name: displayName
      }
    })
  }
}
