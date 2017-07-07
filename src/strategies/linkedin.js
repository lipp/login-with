module.exports = {
  Ctor: require('passport-linkedin-oauth2').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_LINKEDIN_CLIENTID
    const clientSecret = env.LW_LINKEDIN_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        state: true
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    let name
    if (profile.name) {
      if (profile.name.givenName && profile.name.familyName) {
        name = `${profile.name.givenName} ${profile.name.familyName}`
      } else if (profile.name.givenName) {
        name = profile.name.givenName
      } else if (profile.name.familyName) {
        name = profile.name.familyName
      }
    }
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username: profile.displayName,
        provider: 'linkedin',
        name,
        photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null
      }
    })
  }
}
