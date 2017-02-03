module.exports = {
  Ctor: require('passport-facebook').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_FACEBOOK_APPID
    const clientSecret = env.LW_FACEBOOK_APPSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        profileFields: ['displayName', 'name', 'photos']
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
        name,
        photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null
      }
    })
  }
}
